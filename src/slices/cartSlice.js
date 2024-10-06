import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Async actions
const apiUrl = process.env.REACT_APP_API_URL;

export const addToCart = createAsyncThunk(
  `${apiUrl}cart/addToCart`,
  async ({ jewelryId, telegramUserId }) => {
    console.log('Sending data:', { telegramUserId, jewelryId }); // Логируем отправляемые данные
    const response = await axios.post(`${apiUrl}/api/cart`, { telegramUserId, jewelryId });
    return response.data;
  },
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ jewelryId, telegramUserId }) => {
    const response = await axios.delete(`${apiUrl}/api/cart/${jewelryId}`, {
      data: { telegramUserId },
    });
    return response.data;
  },
);

export const fetchCartItems = createAsyncThunk(
  `${apiUrl}cart/fetchCartItems`,
  async (telegramUserId) => {
    console.log(telegramUserId);
    const response = await axios.get(`${apiUrl}/api/cart/${telegramUserId}`);
    console.log('Server response:', response.data); // Добавим логирование ответа сервера
    return response.data;
  },
);

export const selectTotalAmount = (state) =>
  state.cart.items.reduce((total, item) => total + item.jewelry.price, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle', // Общий статус для операций с корзиной
    fetchStatus: 'idle', // Статус для загрузки корзины
    error: null, // Общая ошибка
    fetchError: null, // Ошибка при загрузке корзины
    cartError: null, // Ошибка при добавлении/удалении товара из корзины
  },
  reducers: {
    resetCartState: (state) => {
      state.status = 'idle';
      state.fetchStatus = 'idle';
      state.error = null;
      state.fetchError = null;
      state.cartError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Добавление товара в корзину
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading'; // Задаем общий статус загрузки для операций с корзиной
        state.cartError = null; // Сбрасываем ошибку для операций с корзиной
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Успешная загрузка
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed'; // Ошибка при добавлении товара
        state.cartError = action.error.message;
      })

      // Удаление товара из корзины
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading'; // Задаем статус загрузки
        state.cartError = null; // Сбрасываем ошибку для операций с корзиной
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Успешное удаление товара
        state.items = state.items.filter((item) => item.jewelryId !== action.payload.jewelryId);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed'; // Ошибка при удалении товара
        state.cartError = action.error.message;
      })

      // Получение товаров из корзины
      .addCase(fetchCartItems.pending, (state) => {
        state.fetchStatus = 'loading'; // Задаем статус загрузки для получения корзины
        state.fetchError = null; // Сбрасываем ошибки при загрузке корзины
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded'; // Успешная загрузка корзины
        state.items = action.payload.map((item) => ({
          id: item.id,
          userId: item.userId,
          jewelryId: item.jewelryId,
          jewelry: item.jewelry,
        }));
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.fetchStatus = 'failed'; // Ошибка при загрузке корзины
        state.fetchError = action.error.message;
      });
  },
});

// Экспортируем действия и редьюсер
export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
