import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './operations.js';

const initialState = {
  token: null,
  userAuth: false,
  isLoading: false,
  error: null,
};

const handleRegister = (state, { payload }) => {
  state.token = payload.access_token;
  state.userAuth = true;
};
const handleLogin = (state, { payload }) => {
  console.log(payload.access_token);
  state.token = payload.access_token;
  state.userAuth = true;
};
const UserSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, handleRegister)
      .addCase(registerUser.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(loginUser.fulfilled, handleLogin)
      .addCase(loginUser.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});

export const userReducer = UserSlice.reducer;
