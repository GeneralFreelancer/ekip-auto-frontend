import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
  },
  reducers: {
    addProductsToCart: (state, action) => {
      if (
        action.payload.id &&
        !state.cartProducts.find((product) => product.id === action.payload.id)
      ) {
        state.cartProducts = [...state.cartProducts, action.payload];
      }

      if (action.payload.length) {
        const filteredProducts = action.payload.filter(
          (product) =>
            product.id !==
            state.cartProducts.find(
              (cartProduct) => cartProduct.id === product.id,
            )?.id,
        );
        state.cartProducts = [...state.cartProducts, ...filteredProducts];
      }
    },
    deleteProductsFromCart: (state, action) => {
      if (action.payload.id) {
        state.cartProducts = state.cartProducts.filter(
          (product) => product.id !== action.payload.id,
        );
      }

      if (action.payload.length) {
        const filteredState = state.cartProducts.filter(
          (product) =>
            product.id !==
            action.payload.find(
              (productToDelete) => productToDelete.id === product.id,
            ).id,
        );
        state.cartProducts = filteredState;
      }
    },
    updateProductQuantityInCart: (state, action) => {
      const foundProduct = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );

      if (foundProduct) {
        const filteredState = state.cartProducts.filter(
          (product) => product.id !== foundProduct.id,
        );

        state.cartProducts = [
          ...filteredState,
          {
            ...foundProduct,
            quantity: action.payload.quantity,
          },
        ];
      }
    },
    setProductsInCart: (state, action) => {
      state.cartProducts = [];
    },
  },
});

export const {
  addProductsToCart,
  deleteProductsFromCart,
  updateProductQuantityInCart,
  setProductsInCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const selectedCart = (state) => state.cart;
