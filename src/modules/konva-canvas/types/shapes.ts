import { DrawingAction } from ".";

// Base interface common for all shapes
export interface ShapeBase {
  id: string;

  type: DrawingAction;

  name?: string;

  x: number;

  y: number;

  fill?: string;

  stroke?: string;

  scaleX?: number;

  scaleY?: number;

  rotation?: number;

  draggable?: boolean;
}

export interface RectangleShape extends ShapeBase {
  type: DrawingAction.Rectangle;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
}

export interface DiamondShape extends ShapeBase {
  type: DrawingAction.Diamond;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  rotation: number;
}

export interface CircleShape extends ShapeBase {
  type: DrawingAction.Circle;
  radius: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;

  // Add width and height calculated from radius (used in calculating bounding box)
  width?: number;
  height?: number;
}

export interface EllipseShape extends ShapeBase {
  type: DrawingAction.Ellipse;
  radiusX: number;
  radiusY: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;

  width?: number; // = radiusX * 2
  height?: number; // = radiusY * 2
}

export interface LineShape extends ShapeBase {
  type: DrawingAction.Line;
  points: number[]; // [x1, y1, x2, y2, ...]
  stroke: string;
  strokeWidth?: number;
  tension?: number;
  closed?: boolean;

  width?: number;
  height?: number;
}

export interface ScribbleShape extends ShapeBase {
  type: DrawingAction.Scribble;
  points: number[];
  stroke: string;
  strokeWidth?: number;
  tension?: number;
  closed?: boolean;

  width?: number;
  height?: number;
}

export interface PolygonShape extends ShapeBase {
  type: DrawingAction.Polygon;
  points: number[];
  stroke: string;
  strokeWidth?: number;
  tension?: number;
  closed?: boolean;

  width?: number;
  height?: number;
}

export interface StarShape extends ShapeBase {
  type: DrawingAction.Star;
  points: number[];
  stroke: string;
  strokeWidth?: number;
  tension?: number;
  closed?: boolean;
  sides?: number;

  width?: number;
  height?: number;
}

export interface TriangleShape extends ShapeBase {
  type: DrawingAction.Triangle;
  points: number[];
  stroke: string;
  strokeWidth?: number;
  tension?: number;
  closed?: boolean;
  sides?: number;

  width?: number;
  height?: number;
}

export interface ArrowShape extends ShapeBase {
  type: DrawingAction.Arrow;
  points: number[];
  stroke: string;
  strokeWidth?: number;
  tension?: number;
  closed?: boolean;

  width?: number;
  height?: number;
}

export interface TextShape extends ShapeBase {
  type: DrawingAction.Text;
  width: number;
  height: number;
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
}

export interface ArcShape extends ShapeBase {
  type: DrawingAction.Arc;
  innerRadius: number;
  outerRadius: number;
  angle: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;

  width?: number;
  height?: number;
}

export type ShapeProps =
  | RectangleShape
  | DiamondShape
  | ScribbleShape
  | CircleShape
  | EllipseShape
  | LineShape
  | ArrowShape
  | PolygonShape
  | StarShape
  | TriangleShape
  | TextShape
  | ArcShape;
