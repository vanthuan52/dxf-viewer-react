import { useState, useRef } from "react";
import { Util } from "konva/lib/Util";
import { KonvaEventObject } from "konva/lib/Node";
import { ShapeProps } from "../types/shapes";
import { getBoundingBox } from "../utils/shape-selection";
import { getRelativePointerPosition, getNumericVal } from "../utils/canvas";
import { DrawingAction } from "../types";

type UseShapeSelectionProps = {
  transformerRef: any;
  shapes: ShapeProps[];
  setShapes: any;
  drawingAction: DrawingAction;
};

export const useShapeSelection = ({
  transformerRef,
  shapes,
  setShapes,
  drawingAction,
}: UseShapeSelectionProps) => {
  const isSelecting = useRef(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  // a box that surrounds an object(s)
  const [selectionBox, setSelectionBox] = useState({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  // Click handler for stage
  const handleStageClick = (e: any) => {
    if (selectionBox.visible) {
      return;
    }

    // If click on empty area - remove all selections
    if (e.target === e.target.getStage()) {
      setSelectedIds([]);
      return;
    }

    const clickedId = e.target.id();

    // Do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = selectedIds.includes(clickedId);

    if (!metaPressed && !isSelected) {
      // If no key pressed and the node is not selectedyh
      // select just one
      setSelectedIds([clickedId]);
    } else if (metaPressed && isSelected) {
      // If we pressed keys and node was selected
      // we need to remove it from selection
      setSelectedIds(selectedIds.filter((id) => id !== clickedId));
    } else if (metaPressed && !isSelected) {
      // Add the node into selection
      setSelectedIds([...selectedIds, clickedId]);
    }
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (drawingAction !== DrawingAction.Select) return;

    // Do nothing if we mousedown on any shape
    if (e.target !== e.target.getStage()) {
      return;
    }

    // Start selection rectangle
    isSelecting.current = true;

    const pos = getRelativePointerPosition(e?.target?.getStage());
    setSelectionBox({
      visible: true,
      x1: getNumericVal(pos?.x),
      y1: getNumericVal(pos?.y),
      x2: getNumericVal(pos?.x),
      y2: getNumericVal(pos?.y),
    });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (drawingAction !== DrawingAction.Select) return;

    // Do nothing if we didn't start selection
    if (!isSelecting.current) {
      return;
    }

    const pos = getRelativePointerPosition(e?.target?.getStage());
    setSelectionBox({
      ...selectionBox,
      x2: getNumericVal(pos?.x),
      y2: getNumericVal(pos?.y),
    });
  };

  const handleMouseUp = () => {
    if (drawingAction !== DrawingAction.Select) return;

    // Do nothing if we didn't start selection
    if (!isSelecting.current) return;

    isSelecting.current = false;

    const selBox = {
      x: Math.min(selectionBox.x1, selectionBox.x2),
      y: Math.min(selectionBox.y1, selectionBox.y2),
      width: Math.abs(selectionBox.x2 - selectionBox.x1),
      height: Math.abs(selectionBox.y2 - selectionBox.y1),
    };

    const selected = shapes.filter((shape, idx) => {
      const bbox = getBoundingBox(shape);
      // Check if shape intersects with selection box
      return Util.haveIntersection(selBox, bbox);
    });

    // Update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      setSelectionBox({
        ...selectionBox,
        visible: false,
      });
    });
    setSelectedIds(selected.map((shape) => shape.id));
  };

  const handleDragEnd = (e: KonvaEventObject<MouseEvent>) => {
    const id = e.target.id();
    setShapes((prevShape: any) => {
      const newShapes = [...prevShape];
      const index = newShapes.findIndex((shape) => shape.id === id);
      if (index !== -1) {
        newShapes[index] = {
          ...newShapes[index],
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return newShapes;
    });
  };

  const handleTransformEnd = (e: KonvaEventObject<MouseEvent>) => {
    // Find which shape(s) were transformed
    const nodes = transformerRef.current.nodes();

    const newRects = [...shapes];

    // Update each transformed node
    nodes.forEach((node: any) => {
      const id = node.id();
      const index = newRects.findIndex((r) => r.id === id);

      if (index !== -1) {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // Reset scale
        node.scaleX(1);
        node.scaleY(1);

        // Update the state with new values
        newRects[index] = {
          ...newRects[index],
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY),
        };
      }
    });

    setShapes(newRects);
  };

  return {
    selectionBox,
    selectedIds,
    setSelectedIds,
    handleStageClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDragEnd,
    handleTransformEnd,
  };
};
