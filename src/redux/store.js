import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice';
import subMenuReducer from './features/subMenu';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedSubMenuReducer = persistReducer(persistConfig, subMenuReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    // menu: persistedSubMenuReducer,
  },
});

export const persistor = persistStore(store);
