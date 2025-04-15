import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrawingAction } from "../types";
import { ShapeProps } from "../types/shapes";

interface CanvasState {
  drawingAction: DrawingAction;
  shapes: ShapeProps[];
}

const initialState: CanvasState = {
  drawingAction: DrawingAction.Select,
  shapes: [],
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setDrawingAction: (state, action: PayloadAction<DrawingAction>) => {
      state.drawingAction = action.payload;
    },
    resetDrawingAction: (state) => {
      state.drawingAction = DrawingAction.Select;
    },
    addShape: (state, action: PayloadAction<ShapeProps>) => {
      state.shapes.push(action.payload);
    },
    setShapes: (state, action: PayloadAction<ShapeProps[]>) => {
      state.shapes = action.payload;
    },
    clearShapes: (state) => {
      state.shapes = [];
    },
  },
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
