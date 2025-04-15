import { DrawingAction, IRect } from "../types";
import { ShapeProps } from "../types/shapes";

export const getBoundingBox = (shape: ShapeProps): IRect => {
  console.log("shape: ", shape);
  switch (shape.type) {
    case DrawingAction.Rectangle:
    case DrawingAction.Diamond:
    case DrawingAction.Text:
      return {
        x: shape.x,
        y: shape.y,
        width: shape.width ?? 0,
        height: shape.height ?? 0,
      };

    case DrawingAction.Circle:
      return {
        x: shape.x - shape.radius,
        y: shape.y - shape.radius,
        width: shape.radius * 2,
        height: shape.radius * 2,
      };

    case DrawingAction.Ellipse:
      return {
        x: shape.x - shape.radiusX,
        y: shape.y - shape.radiusY,
        width: shape.radiusX * 2,
        height: shape.radiusY * 2,
      };

    case DrawingAction.Line:
    case DrawingAction.Scribble:
    case DrawingAction.Arrow:
    case DrawingAction.Polygon:
    case DrawingAction.Star:
    case DrawingAction.Triangle: {
      const points = shape.points;
      const xs = points.filter((_, i) => i % 2 === 0);
      const ys = points.filter((_, i) => i % 2 === 1);

      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }

    case DrawingAction.Arc: {
      const { x, y, outerRadius } = shape;
      return {
        x: x - outerRadius,
        y: y - outerRadius,
        width: outerRadius * 2,
        height: outerRadius * 2,
      };
    }
  }
};

export const isIntersect = (
  box1: { xMin: number; yMin: number; xMax: number; yMax: number },
  box2: { xMin: number; yMin: number; xMax: number; yMax: number }
) => {
  return !(
    box2.xMin > box1.xMax ||
    box2.xMax < box1.xMin ||
    box2.yMin > box1.yMax ||
    box2.yMax < box1.yMin
  );
};
