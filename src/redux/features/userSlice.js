import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userdata: null,
  token: "",
  roles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.roles = action.payload.user.roles;
      state.token = action.payload.token;
      state.userdata = action.payload.user;
      state.isRegistered = true;
      state.isRegisteredConfirmed = action.payload.user.isEmailConfirmed;
      state.isDataFullFilled = action.payload.user.livingAddress ? true : false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userdata = null;
      state.token = null;
      state.roles = [];
      state.isRegistered = null;
      state.isRegisteredConfirmed = null;
      state.isDataFullFilled = null;
      localStorage.removeItem("role");
    },
    register: (state, action) => {
      state.isRegistered = true;
      state.isRegisteredConfirmed = false;
      state.userdata = action.payload;
      state.isDataFullFilled = false;
    },
    registerConfirmed: (state, action) => {
      state.isRegistered = true;
      state.isRegisteredConfirmed = action.payload.user.isEmailConfirmed;
      state.isDataFullFilled = false;
      state.token = action.payload.token;
      state.roles = action.payload.user.roles;
    },
    fullUserRegistered: (state, action) => {
      state.isDataFullFilled = true;
      state.userdata.phone = action.payload.user.phone;
      state.userdata.firstName = action.payload.user.firstName;
      state.userdata.lastName = action.payload.user.lastName;
      state.userdata.secondName = action.payload.user.secondName;
      state.userdata.email = action.payload.user.email;
      state.userdata.street = action.payload.user.livingAddress.street;
      state.userdata.city = action.payload.user.livingAddress.city;
      state.userdata.additionalInfo =
        action.payload.user.livingAddress.additionalInfo;
    },
  },
});

export const {
  login,
  logout,
  register,
  registerConfirmed,
  fullUserRegistered,
} = userSlice.actions;
export default userSlice.reducer;
export const selectedUser = (state) => state.user;
