import { createSlice } from '@reduxjs/toolkit';
import * as API from './operations.js';

const initialState = {
  attachments: [],
  error: null,
  attachmID: '',
  attachm: null,
};
const handlePending = state => {
  state.isLoading = true;
};
const attachSlice = createSlice({
  name: 'attach',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(API.sendAttach.pending, handlePending)
      .addCase(API.sendAttach.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.attachments.push(payload);
        state.attachmID = payload._id;
      })
      .addCase(API.sendAttach.rejected, (state, action) => {
        console.log(state, action);
      })
      .addCase(API.getAttach.pending, handlePending)
      .addCase(API.getAttach.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.attachm = payload.data;
        // state.attachments.push(payload);
        // state.attachmID = payload._id;
      })
      .addCase(API.getAttach.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const attachReducer = attachSlice.reducer;
