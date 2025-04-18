import { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { Stage as StageType } from "konva/lib/Stage";
import { Layer as LayerType } from "konva/lib/Layer";
import { Node, NodeConfig } from "konva/lib/Node";
import { v4 as uuidv4 } from "uuid";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { RootState, useAppSelector } from "@/store";
import useCanvasResize from "@/modules/konva-canvas/hooks/useCanvasResize";
import useShapeCreation from "@/modules/konva-canvas/hooks/useShapeCreation";
import { GroupProps, ShapeProps } from "@/modules/konva-canvas/types/shapes";
import DrawingLayer from "@/modules/konva-canvas/components/drawing-layer/drawing-layer";
import { useShapeSelection } from "@/modules/konva-canvas/hooks/useShapeSelection";
import SelectionBox from "@/modules/konva-canvas/components/selection-box";
import { DrawingAction } from "@/modules/konva-canvas/types";
import { TransformerWrapper } from "@/modules/konva-canvas/components/transformer-wrapper";
import useShapeDeletion from "@/modules/konva-canvas/hooks/useShapeDeletion";
import usePanning from "@/modules/konva-canvas/hooks/usePanning";
import { useSelectedShapeProperties } from "@/modules/konva-canvas/hooks/useSelectedShapeProperties";
import PropertyPanel from "@/modules/konva-canvas/components/property-panel/property-panel";
import { DXFParsedData } from "../../types/dxf";
import {
  convertDxfEntityToShape,
  normalizeEntities,
} from "../../utils/dxf-utils";
import { EntityRenderer } from "../entity-renderer";
import useZoom from "../../hooks/useZoom";

// @ts-ignore
window.Konva.hitOnDragEnabled = true;
interface CanvasStageProps {
  dxfData: DXFParsedData | null;
  shapes: ShapeProps[];
  setShapes: any;
  resetZoomFlag: boolean;
  onResetZoom: () => void;
}

export const CanvasStage = ({
  dxfData,
  shapes,
  setShapes,
  resetZoomFlag,
  onResetZoom,
}: CanvasStageProps) => {
  const drawingAction = useAppSelector(
    (state: RootState) => state.canvas.drawingAction
  );

  const stageRef = useRef<StageType | null>(null);
  const layerRef = useRef<LayerType | null>(null);
  const transformerRef = useRef<TransformerType | null>(null);
  const shapeRefs = useRef<Map<string, Node>>(new Map());

  const [currentlyDrawnShape, setCurrentlyDrawnShape] = useState<
    ShapeProps | undefined
  >();

  const { width, height } = useCanvasResize();

  const panning = usePanning({ initialScale: 1 });
  const { scale: zoomScale, resetZoom } = useZoom({ stageRef });
  const selection = useShapeSelection({
    transformerRef,
    shapes,
    setShapes,
    drawingAction,
  });

  const drawing = useShapeCreation({
    stageRef,
    shapes,
    setShapes,
    drawingAction,
    currentlyDrawnShape,
    setCurrentlyDrawnShape,
  });

  useShapeDeletion({
    selectedIds: selection.selectedIds,
    setSelectedIds: selection.setSelectedIds,
    setShapes,
  });

  const selectedShape = useSelectedShapeProperties({
    shapes,
    selectedIds: selection.selectedIds,
  });

  // useEffect(() => {
  //   if (dxfData?.entities && dxfData.blocks) {
  //     const newDxfShapes = dxfData.entities.flatMap((entity) => {
  //       const converted = convertDxfEntityToShape(entity, dxfData.blocks);
  //       return converted
  //         ? Array.isArray(converted)
  //           ? converted
  //           : [converted]
  //         : [];
  //     });
  //     setShapes((prevShapes: ShapeProps[]) => [...prevShapes, ...newDxfShapes]);
  //   }
  // }, [dxfData, setShapes]);

  useEffect(() => {
    if (dxfData?.entities && dxfData.blocks) {
      const newDxfShapes: ShapeProps[] = [];

      dxfData.entities.forEach((entity) => {
        if (entity.type === "INSERT") {
          const blockName = entity.name;
          const blockDefinition = dxfData.blocks![blockName];

          if (blockDefinition && blockDefinition.entities) {
            const blockShapes: ShapeProps[] = blockDefinition.entities
              .map((blockEntity) =>
                convertDxfEntityToShape(blockEntity, dxfData.blocks)
              )
              .filter((shape): shape is ShapeProps => Boolean(shape));

            newDxfShapes.push({
              id: `insert-${entity.handle}-${uuidv4()}`,
              type: DrawingAction.Group as any,
              x: entity.position?.x || 0,
              y: -(entity.position?.y || 0),
              rotation: -(entity.rotation || 0),
              scaleX: entity.xScale || 1,
              scaleY: entity.yScale || 1,
              draggable: true,
              opacity: entity.transparency ? 1 - entity.transparency : 1,
              visible: entity.visible !== false,
              layer: entity.layer,
              children: blockShapes,
            } as GroupProps);
          } else {
            console.warn(
              `Block definition not found or has no entities for INSERT: ${blockName}`,
              entity
            );
          }
        } else if (entity.type === "DIMENSION") {
          const blockName = entity.block;
          const blockDefinition = dxfData.blocks![blockName];

          if (blockDefinition && blockDefinition.entities) {
            const dimensionShapes: ShapeProps[] = blockDefinition.entities
              .map((blockEntity) =>
                convertDxfEntityToShape(blockEntity, dxfData.blocks)
              )
              .filter((shape): shape is ShapeProps => Boolean(shape));

            newDxfShapes.push({
              id: `dimension-${entity.handle}-${uuidv4()}`,
              type: DrawingAction.Group as any,
              x: entity.anchorPoint?.x || 0,
              y: -(entity.anchorPoint?.y || 0),
              draggable: true,
              opacity: entity.transparency ? 1 - entity.transparency : 1,
              visible: entity.visible !== false,
              layer: entity.layer,
              children: dimensionShapes,
            } as GroupProps);
          } else {
            console.warn(
              `Block definition not found or has no entities for DIMENSION: ${blockName}`,
              entity
            );
          }
        } else {
          // Xử lý các entity không phải là INSERT hoặc DIMENSION
          const converted = convertDxfEntityToShape(entity, dxfData.blocks);
          if (converted) {
            if (Array.isArray(converted)) {
              newDxfShapes.push(...converted);
            } else {
              newDxfShapes.push(converted);
            }
          }
        }
      });

      setShapes((prevShapes: ShapeProps[]) => [...prevShapes, ...newDxfShapes]);
    }
  }, [dxfData, setShapes]);

  // Update transformer when selection changes
  useEffect(() => {
    if (!transformerRef.current) return;
    const nodes = selection.selectedIds
      .map((id) => shapeRefs.current.get(id))
      .filter((node): node is Node<NodeConfig> => Boolean(node));
    transformerRef.current.nodes(nodes);
  }, [selection.selectedIds]);

  useEffect(() => {
    if (resetZoomFlag) {
      resetZoom();
    }
  }, [resetZoomFlag, resetZoom]);

  return (
    <>
      <Stage
        ref={stageRef}
        x={panning.stagePos.x}
        y={panning.stagePos.y}
        scaleX={zoomScale.x * panning.stageScale.x}
        scaleY={zoomScale.y * panning.stageScale.y}
        width={width}
        height={height}
        className=""
        draggable={drawingAction === DrawingAction.Panning}
        onDragMove={
          drawingAction === DrawingAction.Panning
            ? panning.handleDragMove
            : undefined
        }
        onDragEnd={
          drawingAction === DrawingAction.Panning
            ? panning.handleDragEnd
            : undefined
        }
        onMouseDown={
          drawingAction === DrawingAction.Select
            ? selection.handleMouseDown
            : drawing.onStageMouseDown
        }
        onMouseMove={
          drawingAction === DrawingAction.Select
            ? selection.handleMouseMove
            : drawing.onStageMouseMove
        }
        onMouseUp={
          drawingAction === DrawingAction.Select
            ? selection.handleMouseUp
            : drawing.onStageMouseUp
        }
        onClick={selection.handleStageClick}
        onTouchMove={
          drawingAction === DrawingAction.Panning
            ? panning.handleTouchMove
            : undefined
        }
        onTouchEnd={
          drawingAction === DrawingAction.Panning
            ? panning.handleTouchEnd
            : undefined
        }
      >
        <Layer ref={layerRef}>
          <DrawingLayer
            shapes={shapes}
            shapeRefs={shapeRefs}
            onDragEnd={selection.handleDragEnd}
          />
          {currentlyDrawnShape && (
            <DrawingLayer
              shapes={[currentlyDrawnShape]}
              shapeRefs={shapeRefs}
              onDragEnd={selection.handleDragEnd}
            />
          )}

          {/* {dxfData &&
            renderDxfEntity()?.map((entity, index) => (
              <EntityRenderer
                key={index}
                entity={entity}
                blocks={dxfData.blocks}
              />
            ))} */}
          <TransformerWrapper
            transformerRef={transformerRef}
            handleTransformEnd={selection.handleTransformEnd}
          />

          {selection.selectionBox.visible && (
            <SelectionBox
              x={Math.min(selection.selectionBox.x1, selection.selectionBox.x2)}
              y={Math.min(selection.selectionBox.y1, selection.selectionBox.y2)}
              width={Math.abs(
                selection.selectionBox.x2 - selection.selectionBox.x1
              )}
              height={Math.abs(
                selection.selectionBox.y2 - selection.selectionBox.y1
              )}
            />
          )}
        </Layer>
      </Stage>
      {selectedShape && <PropertyPanel shape={selectedShape} />}
    </>
  );
};

export default CanvasStage;
