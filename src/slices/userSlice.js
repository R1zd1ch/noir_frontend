import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Thunk для получения или создания пользователя по данным Telegram API
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Используем POST для передачи данных
      const response = await axios.post(`${apiUrl}/api/user/${userData.telegramId}`, userData);
      console.log(response.data.user);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching user data');
    }
  },
);

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
