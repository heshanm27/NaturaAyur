import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  firstName: string;
  role: string;
  message: string;
  logOutMessage: string;
}

export interface LoginResponse {
  accessToken: string;
  firstName: string;
  role: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: "",
  firstName: "",
  role: "",
  message: "",
  logOutMessage: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.firstName = action.payload.firstName;
      state.role = action.payload.role;
      state.logOutMessage = "";
      state.isLoggedIn = true;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
      state.logOutMessage = "";
    },
    logOut: (state, action) => {
      state.accessToken = "";
      state.firstName = "";
      state.role = "";
      state.logOutMessage = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const { login, logOut, setMessage, clearMessage } = authSlice.actions;
