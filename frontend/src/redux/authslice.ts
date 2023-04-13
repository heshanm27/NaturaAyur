import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: "",
    firstName: "",
    role: "",
    message: "",
    logOutMessage: "",
  },
  reducers: {
    setLoginResponse: (state, action) => {
      state.access_token = action.payload.access_token;
      state.firstName = action.payload.firstName;
      state.role = action.payload.role;
      state.logOutMessage = "";
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
    },
  },
});

export const { setLoginResponse, logOut, setMessage, clearMessage } = authSlice.actions;
export default authSlice.reducer;
