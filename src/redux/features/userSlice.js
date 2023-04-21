import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  // token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // const {isLoggedIn, currentUser, accessToken} = action.payload
      state.isLoggedIn = true;
      state.currentUser = action.payload;
      // state.token = accessToken
      // localStorage.setItem("token", accessToken)
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      // state.token = null
      // localStorage.removeItem('token')
    },
    register: (state, action) => {
      state.isRegistered = true;
      state.currentUser = action.payload;
    },
    registerOut: (state) => {
      state.isRegistered = false;
      state.currentUser = null;
    },
  },
});

export const { login, logout, register, registerOut } = userSlice.actions;
export default userSlice.reducer;
export const selectedUser = (state) => state.user;
