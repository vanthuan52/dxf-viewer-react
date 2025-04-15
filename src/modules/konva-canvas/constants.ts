import { DrawingAction } from "./types";
import {
  ArcShape,
  ArrowShape,
  CircleShape,
  DiamondShape,
  EllipseShape,
  LineShape,
  PolygonShape,
  RectangleShape,
  ScribbleShape,
  ShapeBase,
  StarShape,
  TextShape,
  TriangleShape,
} from "./types/shapes";

export const MENU_BAR_HEIGHT = 70;
export const SHAPE_DEFAULT_COLOR = "#000";

export const DEFAULT_SHAPE_PROPERTIES: ShapeBase = {
  id: "uuid",
  type: DrawingAction.Line,
  name: DrawingAction.Line,
  x: 0,
  y: 0,
  fill: undefined,
  stroke: SHAPE_DEFAULT_COLOR,
  scaleX: 1,
  scaleY: 1,
  rotation: undefined,
  draggable: true,
};

export const DEFAULT_RECTANGLE_PROPERTIES: RectangleShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Rectangle,
  name: DrawingAction.Rectangle,
  width: 10,
  height: 10,
  strokeWidth: 2,
};

export const DEFAULT_DIAMOND_PROPERTIES: DiamondShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Diamond,
  name: DrawingAction.Diamond,
  width: 10,
  height: 10,
  strokeWidth: 2,
  rotation: 45,
};

export const DEFAULT_CIRCLE_PROPERTIES: CircleShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Circle,
  name: DrawingAction.Circle,
  radius: 1,
  strokeWidth: 2,
};

export const DEFAULT_ELLIPSE_PROPERTIES: EllipseShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Ellipse,
  name: DrawingAction.Ellipse,
  radiusX: 1,
  radiusY: 1,
  strokeWidth: 2,
};

export const DEFAULT_LINE_PROPERTIES: LineShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Line,
  name: DrawingAction.Line,
  points: [0, 0, 10, 10],
  stroke: SHAPE_DEFAULT_COLOR,
  strokeWidth: 2,
  tension: undefined,
  closed: undefined,
};

export const DEFAULT_SCRIBBLE_PROPERTIES: ScribbleShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Scribble,
  name: DrawingAction.Scribble,
  points: [0, 0, 10, 10],
  stroke: SHAPE_DEFAULT_COLOR,
  width: undefined,
  height: undefined,
  strokeWidth: 2,
  tension: undefined,
  closed: undefined,
};

export const DEFAULT_POLYGON_PROPERTIES: PolygonShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Polygon,
  name: DrawingAction.Polygon,
  points: [0, 0, 10, 10],
  stroke: SHAPE_DEFAULT_COLOR,
  width: undefined,
  height: undefined,
  strokeWidth: 2,
  tension: undefined,
  closed: undefined,
};

export const DEFAULT_STAR_PROPERTIES: StarShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Star,
  name: DrawingAction.Star,
  points: [0, 0, 10, 10],
  stroke: SHAPE_DEFAULT_COLOR,
  width: undefined,
  height: undefined,
  strokeWidth: 2,
  tension: undefined,
  closed: undefined,
  sides: undefined,
};

export const DEFAULT_TRIANGLE_PROPERTIES: TriangleShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Triangle,
  name: DrawingAction.Triangle,
  points: [0, 0, 10, 10],
  stroke: SHAPE_DEFAULT_COLOR,
  width: undefined,
  height: undefined,
  strokeWidth: 2,
  tension: undefined,
  closed: undefined,
  sides: undefined,
};

export const DEFAULT_ARROW_PROPERTIES: ArrowShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Arrow,
  name: DrawingAction.Arrow,
  points: [0, 0, 10, 10],
  stroke: SHAPE_DEFAULT_COLOR,
  width: undefined,
  height: undefined,
  strokeWidth: 2,
  tension: undefined,
  closed: undefined,
};

export const DEFAULT_TEXT_PROPERTIES: TextShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Text,
  name: DrawingAction.Text,
  text: "New Text",
  width: 100,
  height: 30,
  fontSize: 24,
  fontFamily: undefined,
  fill: "green",
};

export const DEFAULT_ARC_PROPERTIES: ArcShape = {
  ...DEFAULT_SHAPE_PROPERTIES,
  type: DrawingAction.Arc,
  name: DrawingAction.Arc,
  innerRadius: 0,
  outerRadius: 1,
  angle: 90,
  width: undefined,
  height: undefined,
};
