import { configureStore } from '@reduxjs/toolkit';
import jewelryReducer from './JewelrySlice';

export const store = configureStore({
  reducer: {
    jewelry: jewelryReducer,
  },
});
