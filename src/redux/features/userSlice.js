import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userdata: null,
  // token: '',
  // role: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userdata = null;
      // state.token = null
      // localStorage.removeItem('token')
    },
    register: (state, action) => {
      state.isRegistered = true;
      state.isRegisteredConfirmed = true;  //
      state.userdata = action.payload;
      state.isDataFullFilled = false;
    },
    fullUserRegistered: (state, action) => {
      // state.isRegistereConfirmed = true; приходит после линки
      state.isDataFullFilled = true;
      state.userdata = action.payload;
    }
  },
});

export const { login, logout, register, registerOut, fullUserRegistered } = userSlice.actions;
export default userSlice.reducer;
export const selectedUser = (state) => state.user;
