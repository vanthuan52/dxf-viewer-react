import { useMemo } from "react";
import { ShapeProps } from "@/modules/konva-canvas/types/shapes";

type UseSelectedShapeProperties = {
  shapes: ShapeProps[];
  selectedIds: string[];
};

export const useSelectedShapeProperties = ({
  shapes,
  selectedIds,
}: UseSelectedShapeProperties) => {
  const selectedShape = useMemo(() => {
    if (selectedIds.length === 1) {
      return shapes.find((shape) => shape.id === selectedIds[0]);
    }
    return null;
  }, [shapes, selectedIds]);

  return selectedShape;
};
