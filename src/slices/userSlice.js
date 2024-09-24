import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch user by telegramId
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (telegramId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/${telegramId}`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const { user, loading, error } = useSelector((state) => state.user);

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
