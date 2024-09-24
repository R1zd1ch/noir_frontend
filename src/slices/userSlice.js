import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; // Проверьте, что переменная окружения правильно установлена

// Thunk to fetch user by telegramId
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (telegramId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/${telegramId}`); // Используем обратные кавычки
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
