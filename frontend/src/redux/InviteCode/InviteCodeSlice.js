import { createSlice } from '@reduxjs/toolkit';
import * as API from './operations.js';

const initialState = {
  userType: '',
  code: null,
  projectId: null,
};

const InviteCodeSlice = createSlice({
  name: 'inviteCode',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(API.generationInviteCode.pending, (state, action) => {})
      .addCase(API.generationInviteCode.fulfilled, (state, action) => {
        state.userType = action.payload.type;
        state.code = action.payload.code;
      })
      .addCase(API.generationInviteCode.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.accpetInviteCode.pending, (state, action) => {})
      .addCase(API.accpetInviteCode.fulfilled, (state, action) => {
        console.log(action.payload);
        state.projectId = action.payload.project_id;
        // console.log(' PAYLOAD: ', action.payload);
      })
      .addCase(API.accpetInviteCode.rejected, (state, action) => {
        console.log('ACTION: ', action);
      });
  },
});

export const inviteCodeReducer = InviteCodeSlice.reducer;
