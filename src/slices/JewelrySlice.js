import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
// Асинхронное действие для получения всех не проданных украшений
export const fetchJewelryItems = createAsyncThunk(
  `${apiUrl}jewelry/fetchJewelryItems`,
  async () => {
    const response = await axios.get(`${apiUrl}/api/jewelry`);
    return response.data;
  },
);

// Создаем слайс
const jewelrySlice = createSlice({
  name: 'jewelry',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'; // сбрасывает статус к 'idle'
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJewelryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJewelryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Сохраняем товары в состояние
        console.log(state.items);
      })
      .addCase(fetchJewelryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = jewelrySlice.actions;
export default jewelrySlice.reducer;
