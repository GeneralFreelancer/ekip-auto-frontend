import { createSlice } from "@reduxjs/toolkit";

const advertisingSlice = createSlice({
  name: "advertising",
  initialState: {
    advertising: []
  },
  reducers: {
    setAdvertising: (state, action) => {
      state.advertising = action.payload
    },
    
  },
});

export const { setAdvertising } = advertisingSlice.actions;
export default advertisingSlice.reducer;
export const selectedAdvertising = (state) => state.advertising;
