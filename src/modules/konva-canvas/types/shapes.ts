import type Konva from "konva";
import { DrawingAction } from ".";

// Base interface common for all shapes
export interface ShapeBase extends Konva.ShapeConfig {
  id: string;
  type: DrawingAction;
  name?: string;
  x: number;
  y: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  draggable?: boolean;
  opacity?: number;
  visible?: boolean;
  layer?: string;
  color?: number;
  lineType?: string;
  lineScaleFactor?: number;
}

export interface RectangleShape extends ShapeBase {
  type: DrawingAction.Rectangle;
  width: number;
  height: number;
  cornerRadius?: number;
}

export interface DiamondShape extends ShapeBase {
  type: DrawingAction.Diamond;
  width: number;
  height: number;
  cornerRadius?: number;
  rotation: number;
}

export interface CircleShape extends ShapeBase {
  type: DrawingAction.Circle;
  radius: number;
  dash?: number[];

  // Add width and height calculated from radius (used in calculating bounding box)
  width?: number;
  height?: number;
}

export interface EllipseShape extends ShapeBase {
  type: DrawingAction.Ellipse;
  radiusX: number;
  radiusY: number;

  width?: number; // = radiusX * 2
  height?: number; // = radiusY * 2
}

export interface LineShape extends ShapeBase {
  type: DrawingAction.Line;
  points: number[]; // [x1, y1, x2, y2, ...]
  tension?: number;
  closed?: boolean;
  dash?: number[];

  width?: number;
  height?: number;
}

export interface ScribbleShape extends ShapeBase {
  type: DrawingAction.Scribble;
  points: number[];
  tension?: number;
  closed?: boolean;

  width?: number;
  height?: number;
}

export interface PolygonShape extends ShapeBase {
  type: DrawingAction.Polygon;
  points: number[];
  tension?: number;
  closed?: boolean;
}

export interface StarShape extends ShapeBase {
  type: DrawingAction.Star;
  points: number[];
  innerRadius?: number;
  outerRadius?: number;
  numPoints?: number;
}

export interface TriangleShape extends ShapeBase {
  type: DrawingAction.Triangle;
  points: number[];
}

export interface ArrowShape extends ShapeBase {
  type: DrawingAction.Arrow;
  points: number[];
  pointerLength?: number;
  pointerWidth?: number;
}

export interface TextShape extends ShapeBase {
  type: DrawingAction.Text;
  width: number;
  height: number;
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  align?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
  lineHeight?: number;
  padding?: number;
  ellipsis?: boolean;
}

export interface ArcShape extends ShapeBase {
  type: DrawingAction.Arc;
  innerRadius: number;
  outerRadius: number;
  angle: number;
  clockwise?: boolean;
  rotation?: number;
  dash?: number[];
}

// special shapes may appear in DXF
export interface CircleArcShape extends ShapeBase {
  type: DrawingAction.CircleArc;
  radius: number;
  startAngle: number;
  endAngle: number;
  clockwise?: boolean;
}

export interface PolylineShape extends ShapeBase {
  type: DrawingAction.Polyline;
  points: number[]; // Mảng các tọa độ [x1, y1, x2, y2, ...]
  closed?: boolean;
  tension?: number;
  // width và height có thể được tính toán từ points
}

export interface LWPolylineShape extends ShapeBase {
  type: DrawingAction.LWPolyline;
  points: { x: number; y: number; bulge?: number }[];
  closed?: boolean;
  // width và height có thể được tính toán từ points
}

export interface HatchShape extends ShapeBase {
  type: DrawingAction.Hatch;
  patterns: {
    angle: number;
    scale: number;
    origin: [number, number];
    rows: { offset: [number, number]; data: number[] }[];
  }[];
  boundaries: { points: number[][]; closed: boolean }[];
  fillColor?: string;
}

export interface ImageShape extends ShapeBase {
  type: DrawingAction.Image;
  image: HTMLImageElement | string;
  width: number;
  height: number;
  crop?: { x: number; y: number; width: number; height: number };
}

export interface GroupProps extends ShapeBase {
  children: ShapeProps[];
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
  | ArcShape
  | CircleArcShape
  | PolylineShape
  | LWPolylineShape
  | HatchShape
  | ImageShape
  | GroupProps;
