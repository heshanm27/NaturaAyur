import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  access_token: string;
  firstName: string;
  role: string;
  message: string;
  logOutMessage: string;
}

export interface LoginResponse {
  access_token: string;
  firstName: string;
  role: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  access_token: "",
  firstName: "",
  role: "",
  message: "",
  logOutMessage: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoginResponse: (state, action) => {
      state.access_token = action.payload.access_token;
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
      state.access_token = "";
      state.firstName = "";
      state.role = "";
      state.logOutMessage = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const { setLoginResponse, logOut, setMessage, clearMessage } = authSlice.actions;
