import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice';
import subMenuReducer from './features/subMenu';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: subMenuReducer
  },
})