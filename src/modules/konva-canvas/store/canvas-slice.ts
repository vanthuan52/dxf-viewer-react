import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrawingAction } from "../types";

interface CanvasState {
  drawingAction: DrawingAction;
}

const initialState: CanvasState = {
  drawingAction: DrawingAction.Select,
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
  },
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
