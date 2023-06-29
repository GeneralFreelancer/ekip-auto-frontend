import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  fullUserData: null,
  // token: '',
  // role: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      // state.token = null
      // localStorage.removeItem('token')
    },
    register: (state, action) => {
      state.isRegistered = true;
      state.isRegisteredConfirmed = false;
      state.currentUser = action.payload;
    },
    registerOut: (state) => {
      state.isRegistered = false;
      state.currentUser = null;
    },
    fullUserRegistered: (state, action) => {
      state.isRegistereConfirmed = true;
      state.fullUserData = action.payload;
    }
  },
});

export const { login, logout, register, registerOut, fullUserRegistered } = userSlice.actions;
export default userSlice.reducer;
export const selectedUser = (state) => state.user;
