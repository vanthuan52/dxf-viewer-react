import { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { Stage as StageType } from "konva/lib/Stage";
import { Layer as LayerType } from "konva/lib/Layer";
import { Node, NodeConfig } from "konva/lib/Node";
import { Transformer as TransformerType } from "konva/lib/shapes/Transformer";
import { RootState, useAppSelector } from "@/store";
import useCanvasResize from "@/modules/konva-canvas/hooks/useCanvasResize";
import useShapeCreation from "@/modules/konva-canvas/hooks/useShapeCreation";
import { ShapeProps } from "@/modules/konva-canvas/types/shapes";
import DrawingLayer from "@/modules/konva-canvas/components/drawing-layer/drawing-layer";
import { useShapeSelection } from "@/modules/konva-canvas/hooks/useShapeSelection";
import SelectionBox from "@/modules/konva-canvas/components/selection-box";
import { DrawingAction } from "@/modules/konva-canvas/types";
import { TransformerWrapper } from "@/modules/konva-canvas/components/transformer-wrapper";
import useShapeDeletion from "@/modules/konva-canvas/hooks/useShapeDeletion";
import usePanning from "@/modules/konva-canvas/hooks/usePanning";

// @ts-ignore
window.Konva.hitOnDragEnabled = true;

export const CanvasStage = () => {
  const drawingAction = useAppSelector(
    (state: RootState) => state.canvas.drawingAction
  );

  const stageRef = useRef<StageType | null>(null);
  const layerRef = useRef<LayerType | null>(null);
  const transformerRef = useRef<TransformerType | null>(null);
  const shapeRefs = useRef<Map<string, Node>>(new Map());

  const [shapes, setShapes] = useState<ShapeProps[]>([]);
  const [currentlyDrawnShape, setCurrentlyDrawnShape] = useState<
    ShapeProps | undefined
  >();

  const { width, height } = useCanvasResize();

  const panning = usePanning({});
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

  // Update transformer when selection changes
  useEffect(() => {
    if (!transformerRef.current) return;
    const nodes = selection.selectedIds
      .map((id) => shapeRefs.current.get(id))
      .filter((node): node is Node<NodeConfig> => Boolean(node));
    transformerRef.current.nodes(nodes);
  }, [selection.selectedIds]);

  return (
    <Stage
      ref={stageRef}
      x={panning.stagePos.x}
      y={panning.stagePos.y}
      scaleX={panning.stageScale.x}
      scaleY={panning.stageScale.y}
      width={width}
      height={height}
      className="border border-red-300"
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
  );
};

export default CanvasStage;
