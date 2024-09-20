import { configureStore } from '@reduxjs/toolkit';
import jewelryReducer from './JewelrySlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    jewelry: jewelryReducer,
    cart: cartReducer,
  },
});
