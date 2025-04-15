import { v4 as uuidv4 } from "uuid";
import { DrawingAction } from "../types";
import { ShapeProps } from "../types/shapes";
import {
  DEFAULT_ARC_PROPERTIES,
  DEFAULT_ARROW_PROPERTIES,
  DEFAULT_CIRCLE_PROPERTIES,
  DEFAULT_DIAMOND_PROPERTIES,
  DEFAULT_ELLIPSE_PROPERTIES,
  DEFAULT_LINE_PROPERTIES,
  DEFAULT_POLYGON_PROPERTIES,
  DEFAULT_RECTANGLE_PROPERTIES,
  DEFAULT_SCRIBBLE_PROPERTIES,
  DEFAULT_STAR_PROPERTIES,
  DEFAULT_TEXT_PROPERTIES,
  DEFAULT_TRIANGLE_PROPERTIES,
} from "../constants";

export const createShapeByType = (
  type: DrawingAction,
  x: number,
  y: number,
  color: string
): ShapeProps | null => {
  const id = uuidv4();

  switch (type) {
    case DrawingAction.Scribble:
      return {
        ...DEFAULT_SCRIBBLE_PROPERTIES,
        id,
        points: [x, y, x, y],
        stroke: color,
      } as ShapeProps;

    case DrawingAction.Line:
      return {
        ...DEFAULT_LINE_PROPERTIES,
        id,
        points: [x, y, x, y],
        stroke: color,
      } as ShapeProps;

    case DrawingAction.Arrow:
      return {
        ...DEFAULT_ARROW_PROPERTIES,
        id,
        x,
        y,
        points: [x, y, x, y],
        stroke: color,
      } as ShapeProps;

    case DrawingAction.Circle:
      return {
        ...DEFAULT_CIRCLE_PROPERTIES,
        id,
        x,
        y,
        stroke: color,
      } as ShapeProps;
    case DrawingAction.Rectangle:
      return {
        ...DEFAULT_RECTANGLE_PROPERTIES,
        id,
        x,
        y,
        stroke: color,
      } as ShapeProps;
    case DrawingAction.Diamond:
      return {
        ...DEFAULT_DIAMOND_PROPERTIES,
        id,
        x,
        y,
        stroke: color,
      } as ShapeProps;

    case DrawingAction.Text:
      return {
        ...DEFAULT_TEXT_PROPERTIES,
        id,
        x,
        y,
        stroke: color,
      } as ShapeProps;

    case DrawingAction.Ellipse:
      return {
        ...DEFAULT_ELLIPSE_PROPERTIES,
        id,
        x,
        y,
        stroke: color,
      } as ShapeProps;

    case DrawingAction.Polygon:
      return {
        ...DEFAULT_POLYGON_PROPERTIES,
        id,
        x,
        y,
        points: [x, y, x + 1, y + 1],
        stroke: color,
      } as ShapeProps;
    case DrawingAction.Star:
      return {
        ...DEFAULT_STAR_PROPERTIES,
        id,
        x,
        y,
        points: [x, y, x + 1, y + 1],
        stroke: color,
      } as ShapeProps;
    case DrawingAction.Triangle:
      return {
        ...DEFAULT_TRIANGLE_PROPERTIES,
        id,
        x,
        y,
        stroke: color,
      } as ShapeProps;

    case DrawingAction.Arc:
      return {
        ...DEFAULT_ARC_PROPERTIES,
        id,
        x,
        y,
        stroke: color,
      };

    default:
      return null;
  }
};

export const updateShapeByType = (
  shape: ShapeProps,
  x: number,
  y: number,
  options?: {
    keepAspectRatio?: boolean;
    enableRotation?: boolean;
  }
): Partial<ShapeProps> => {
  if (!shape) return {};

  switch (shape.type) {
    case DrawingAction.Scribble:
      return {
        points: [...(shape.points || []), x, y],
      };

    case DrawingAction.Line:
    case DrawingAction.Arrow:
      if (!shape.points || shape.points.length < 2) return {};
      return {
        points: [shape.points[0], shape.points[1], x, y],
      };

    case DrawingAction.Circle:
      if (shape?.x === undefined || shape?.y === undefined) return {};
      const radius = Math.sqrt(
        Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2)
      );
      return { radius };

    case DrawingAction.Rectangle:
    case DrawingAction.Diamond:
      if (shape.x === undefined || shape.y === undefined) return {};
      return {
        width: x - shape.x,
        height: y - shape.y,
      };

    case DrawingAction.Text:
      return {
        width: x - shape.x,
        height: y - shape.y,
      };

    case DrawingAction.Ellipse:
      if (shape.x === undefined || shape.y === undefined) return {};
      return {
        radiusX: Math.abs(x - shape.x),
        radiusY: Math.abs(y - shape.y),
      };

    case DrawingAction.Polygon:
    case DrawingAction.Star:
    case DrawingAction.Triangle:
      return {
        points: [shape.x, shape.y, x, y],
      };

    case DrawingAction.Arc:
      if (shape.x === undefined || shape.y === undefined) return {};
      const dx = x - shape.x;
      const dy = y - shape.y;
      const outerRadius = Math.sqrt(dx * dx + dy * dy);
      return {
        outerRadius,
        angle: 180,
      };

    default:
      return {};
  }
};
