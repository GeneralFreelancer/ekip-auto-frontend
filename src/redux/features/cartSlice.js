import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setProductsInCart: (state, action) => {
      return action.payload;
    },
    
  },
});

export const { setProductsInCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectedState = (state) => state.cart;
