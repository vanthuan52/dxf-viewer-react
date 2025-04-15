import { JSX } from "react";

export type Coord = {
  x: number;
  y: number;
};

export type ToolItem = {
  id: DrawingAction;
  label: string;
  icon: JSX.Element;
  action?: (tool: DrawingAction) => void;
};

export type ToolItems = Record<string, ToolItem>;

// Bouding box properties
export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export enum DrawingAction {
  // Shape type
  Line = "line",
  Arrow = "arrow",
  Scribble = "scribble",
  Circle = "circle",
  Ellipse = "ellipse",
  Rectangle = "rectangle",
  Polygon = "polygon",
  Text = "text",
  Arc = "arc",
  Diamond = "diamond",
  Star = "star",
  Triangle = "triangle",
  // Drawing action
  Select = "select",
  ZoomOut = "zoomOut",
  ZoomIn = "zoomIn",
  ResetZoom = "resetZoom",
  Move = "move",
  Delete = "delete",
  Clear = "clear",
  Undo = "undo",
  Redo = "redo",
  Eraser = "eraser",
  Panning = "panning",
  Pen = "pen",
  Pencil = "Pencil",
}

export const SELECT_ACTION_LIST = [DrawingAction.Select, DrawingAction.Panning];

export const DRAWING_ACTION_LIST = [
  DrawingAction.Line,
  DrawingAction.Arrow,
  DrawingAction.Scribble,
  DrawingAction.Circle,
  DrawingAction.Ellipse,
  DrawingAction.Rectangle,
  DrawingAction.Polygon,
  DrawingAction.Text,
  DrawingAction.Arc,
  DrawingAction.Diamond,
  DrawingAction.Star,
  DrawingAction.Triangle,
];
