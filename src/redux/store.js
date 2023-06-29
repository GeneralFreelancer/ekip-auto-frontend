import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
// import subMenuReducer from "./features/subMenu";
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
// const persistedSubMenuReducer = persistReducer(persistConfig, subMenuReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    // menu: persistedSubMenuReducer,
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

