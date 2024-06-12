import { createSlice } from '@reduxjs/toolkit';
import * as API from './operations.js';

const initialState = {
  attachments: null,
  commentData: [],
};
const handlePending = state => {
  state.isLoading = true;
};
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(API.getComments.pending, handlePending)
      .addCase(API.getComments.fulfilled, (state, { payload }) => {
        state.commentData = [...payload];
        state.attachments = payload.attachments;
      })
      .addCase(API.getComments.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.createComments.pending, handlePending)
      .addCase(API.createComments.fulfilled, (state, { payload }) => {
        state.commentData.push(payload);
        // state.commentData =
        // state.commentData = [...state.commentData, payload.data];
        // state.attachments = payload.attachments;
      })
      .addCase(API.createComments.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(API.deleteComments.pending, handlePending)
      .addCase(API.deleteComments.fulfilled, (state, { payload }) => {
        state.commentData = state.commentData.filter(
          el => el.id !== payload._id
        );
      })
      .addCase(API.deleteComments.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(API.editComments.pending, handlePending)
      .addCase(API.editComments.fulfilled, (state, { payload }) => {
        const index = state.commentData.findIndex(
          comment => comment._id === payload._id
        );

        // Если комментарий найден, заменить его новым значением
        if (index !== -1) {
          state.commentData[index] = payload;
        }
        // console.log(payload);
      })
      .addCase(API.editComments.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const commentReducer = commentSlice.reducer;
