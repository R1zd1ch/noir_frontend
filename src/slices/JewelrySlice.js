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

// Асинхронное действие для получения конкретного украшения по ID
export const fetchJewelryById = createAsyncThunk('jewelry/fetchJewelryById', async (id) => {
  const response = await axios.get(`${apiUrl}/api/jewelry/${id}`);
  return response.data;
});

// Создаем слайс
const jewelrySlice = createSlice({
  name: 'jewelry',
  initialState: {
    items: [], // Список всех товаров
    currentItem: null, // Текущее изделие для страницы деталей
    status: 'idle',
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Для получения всех товаров
      .addCase(fetchJewelryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJewelryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchJewelryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Для получения конкретного товара по ID
      .addCase(fetchJewelryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJewelryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentItem = action.payload; // Сохраняем детальную информацию в currentItem
      })
      .addCase(fetchJewelryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = jewelrySlice.actions;
export default jewelrySlice.reducer;
