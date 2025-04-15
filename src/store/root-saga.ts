import { all } from "redux-saga/effects";
import { canvasSaga } from "@/modules/konva-canvas/store/canvas-saga";

export default function* rootSaga() {
  yield all([canvasSaga()]);
}
