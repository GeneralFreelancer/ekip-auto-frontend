import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    dateProducts: [],
    topProducts: [],
    lastSeenProducts: [],
    interestProducts: [],
    categoryProducts: [],
    subCategoryProducts: []
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
    setCategoryProducts: (state, action) => {
      state.categoryProducts = action.payload;
    },
    setSubCategoryProducts: (state, action) => {
      state.subCategoryProducts = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setDateProducts,
  setTopProducts,
  setLastSeenProducts,
  setInterestProducts,
  setCategoryProducts,
  setSubCategoryProducts
} = productsSlice.actions;
export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products.allProducts;
export const selectDateProducts = (state) => state.products.dateProducts;
export const selectTopProducts = (state) => state.products.topProducts;
export const selectLastSeenProducts = (state) => state.products.lastSeenProducts;
export const selectInterestProducts = (state) => state.products.interestProducts;
export const selectCategoryProducts = (state) => state.products.categoryProducts;
export const selectSubCategoryProducts = (state) => state.products.subCategoryProducts;