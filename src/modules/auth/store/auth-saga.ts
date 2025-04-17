/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { LoginFormType, RegisterFormType } from "../schemas/authSchema";
import authApi from "../services/authApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../types";
import { authActions } from "./auth-slice";

function* loginHandler(action: PayloadAction<LoginFormType>) {
  try {
    const { message, data }: ApiResponse<any> = yield call(
      authApi.login,
      action.payload
    );
    localStorage.setItem("access_token", data.access_token);
    toast.success(message);
    yield put(authActions.loginSuccess());
  } catch (error: any) {
    yield put(authActions.loginFailure(error.message || "Login failed"));
  }
}

function* registerHandler(action: PayloadAction<RegisterFormType>) {
  try {
    const { message }: ApiResponse<any> = yield call(
      authApi.register,
      action.payload
    );
    toast.success(message);
    yield put(authActions.registerSuccess());
  } catch (error: any) {
    yield put(authActions.registerFailure(error.message || "Register failed"));
  }
}

export function* authSaga() {
  yield takeLatest(authActions.loginRequest, loginHandler);
  yield takeLatest(authActions.registerRequest, registerHandler);
}
