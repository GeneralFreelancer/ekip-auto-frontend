import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteProducts: []
  },
  reducers: {
    setFavoriteProducts: (state, action) => {
      state.favoriteProducts = action.payload
    },
    
  },
});

export const { setFavoriteProducts } = favoriteSlice.actions;
export default favoriteSlice.reducer;
export const selectedFavorite = (state) => state.favorite;
