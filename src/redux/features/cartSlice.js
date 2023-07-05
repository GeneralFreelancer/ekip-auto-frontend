import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: []
  },
  reducers: {
    setProductsInCart: (state, action) => {
      state.cartProducts = action.payload
    },
    
  },
});

export const { setProductsInCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectedCart = (state) => state.cart;
