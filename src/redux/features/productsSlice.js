import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    dateProducts: [],
    topProducts: [],
    lastSeenProducts: [],
    interestProducts: [],
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setDateProducts: (state, action) => {
      state.dateProducts = action.payload;
    },
    setTopProducts: (state, action) => {
      state.topProducts = action.payload;
    },
    setLastSeenProducts: (state, action) => {
      state.lastSeenProducts = action.payload;
    },
    setInterestProducts: (state, action) => {
      state.interestProducts = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setDateProducts,
  setTopProducts,
  setLastSeenProducts,
  setInterestProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products.allProducts;
export const selectDateProducts = (state) => state.products.dateProducts;
export const selectTopProducts = (state) => state.products.topProducts;
export const selectLastSeenProducts = (state) => state.products.lastSeenProducts;
export const selectInterestProducts = (state) => state.products.interestProducts;
