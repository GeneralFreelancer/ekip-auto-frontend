import { createSlice } from "@reduxjs/toolkit";

const advertisingSlice = createSlice({
  name: "advertising",
  initialState: {
    desktop: [],
    tablet: [],
    mobile: [],
  },
  reducers: {
    setAdvertisingDesktop: (state, action) => {
      state.desktop = action.payload;
    },
    setAdvertisingTablet: (state, action) => {
      state.tablet = action.payload;
    },
    setAdvertisingMobile: (state, action) => {
      state.mobile = action.payload;
    },
  },
});

export const {
  setAdvertisingDesktop,
  setAdvertisingTablet,
  setAdvertisingMobile,
} = advertisingSlice.actions;
export default advertisingSlice.reducer;
export const selectedAdvertisingDesktop = (state) => state.advertising.desktop;
export const selectedAdvertisingTablet = (state) => state.advertising.tablet;
export const selectedAdvertisingMobile = (state) => state.advertising.mobile;
