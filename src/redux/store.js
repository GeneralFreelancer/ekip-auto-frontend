import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import favoriteReducer from "./features/favoriteSlice";
import advertisingReducer from "./features/advertisingSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // blacklist: [pokemonApi.reducerPath],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAdvertisingReducer = persistReducer(persistConfig, advertisingReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    cart: cartReducer,
    products: productsReducer,
    favorite: favoriteReducer,
    advertising: persistedAdvertisingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    // extraReducers: (builder) => {
    //   builder.addCase(PURGE, (state) => {
    //       customEntityAdapter.removeAll(state);
    //   });
    // }
});

export const persistor = persistStore(store);

