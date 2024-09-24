import { configureStore } from '@reduxjs/toolkit';
import jewelryReducer from './JewelrySlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    jewelry: jewelryReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
