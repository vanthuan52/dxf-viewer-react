import { useCallback, useRef } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { ShapeProps } from "../types/shapes";
import { createShapeByType, updateShapeByType } from "../utils/shape-creation";
import { DRAWING_ACTION_LIST, DrawingAction } from "../types";
import { SHAPE_DEFAULT_COLOR } from "../constants";
import { getRelativePointerPosition, getNumericVal } from "../utils/canvas";

interface UseShapeCreationProps {
  stageRef: React.RefObject<any>;
  drawingAction: DrawingAction;
  shapes: ShapeProps[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeProps[]>>;
  currentlyDrawnShape: ShapeProps | undefined;
  setCurrentlyDrawnShape: React.Dispatch<
    React.SetStateAction<ShapeProps | undefined>
  >;
}

const useShapeCreation = ({
  stageRef,
  drawingAction,
  shapes,
  setShapes,
  currentlyDrawnShape,
  setCurrentlyDrawnShape,
}: UseShapeCreationProps) => {
  const isDrawing = useRef(false);
  const startPoint = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateCurrentDrawnShape = (
    updater: (prev: ShapeProps | undefined) => Partial<ShapeProps>
  ) => {
    setCurrentlyDrawnShape((prev: any) => ({
      ...(prev || {}),
      ...updater(prev),
    }));
  };

  const getPointerPosition = () => {
    const stage = stageRef.current;
    const pos = getRelativePointerPosition(stage);
    return {
      x: getNumericVal(pos?.x),
      y: getNumericVal(pos?.y),
    };
  };

  const onStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (!DRAWING_ACTION_LIST.includes(drawingAction)) return;

    const { x, y } = getPointerPosition();
    const newShape = createShapeByType(
      drawingAction,
      x,
      y,
      SHAPE_DEFAULT_COLOR
    );
    if (newShape) {
      updateCurrentDrawnShape(() => ({ ...newShape }));
    }
  };

  const onStageMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!DRAWING_ACTION_LIST.includes(drawingAction)) return;

    const { x, y } = getPointerPosition();

    updateCurrentDrawnShape((prev: any) =>
      updateShapeByType(prev, x, y, {
        keepAspectRatio: true,
        enableRotation: true,
      })
    );
  };

  const onStageMouseUp = useCallback(() => {
    if (!DRAWING_ACTION_LIST.includes(drawingAction)) return;

    if (currentlyDrawnShape) {
      setShapes((prev) => [...prev, currentlyDrawnShape]);
    }

    setCurrentlyDrawnShape(undefined);
  }, [drawingAction, currentlyDrawnShape, setShapes, setCurrentlyDrawnShape]);

  return {
    onStageMouseDown,
    onStageMouseMove,
    onStageMouseUp,
  };
};

export default useShapeCreation;
