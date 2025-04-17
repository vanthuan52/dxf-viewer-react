import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginFormType, RegisterFormType } from "../schemas/authSchema";
import { AuthenticatedUser } from "../types";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user?: AuthenticatedUser;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginFormType>) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = action.payload;
    },

    registerRequest: (state, action: PayloadAction<RegisterFormType>) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
