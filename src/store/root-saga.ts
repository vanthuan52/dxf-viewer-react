import { all } from "redux-saga/effects";
import { canvasSaga } from "@/modules/konva-canvas/store/canvas-saga";
import { authSaga } from "@/modules/auth/store/auth-saga";

export default function* rootSaga() {
  yield all([canvasSaga(), authSaga()]);
}
