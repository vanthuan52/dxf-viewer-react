import { Stage } from "konva/lib/Stage";

export const getRelativePointerPosition = (node: Stage | null) => {
  if (!node) return;
  const transform = node.getAbsoluteTransform().copy();
  transform.invert();

  const pos = node.getStage().getPointerPosition();
  if (!pos) return;
  return transform.point(pos);
};

export const getNumericVal = (val: number | undefined) => val || 0;
