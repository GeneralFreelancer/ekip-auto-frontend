import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  userData: null,
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
      state.currentUser = action.payload;
    },
    registerOut: (state) => {
      state.isRegistered = false;
      state.currentUser = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  },
});

export const { login, logout, register, registerOut, setUserData } = userSlice.actions;
export default userSlice.reducer;
export const selectedUser = (state) => state.user;
