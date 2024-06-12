import { createSlice } from '@reduxjs/toolkit';
import * as API from './operations.js';

const initialState = {
  tasks: null,
  task: null,
  taskClose: false,
};

const TaskSlice = createSlice({
  name: 'task',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(API.getAllTask.pending, (state, action) => {})
      .addCase(API.getAllTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(API.getAllTask.rejected, (state, action) => {})
      .addCase(API.updateOneTask.pending, (state, action) => {})
      .addCase(API.updateOneTask.fulfilled, (state, action) => {
        // state.tasks = action.payload;
        state.task = action.payload;
        console.log(action);
      })
      .addCase(API.updateOneTask.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.createNewTask.pending, (state, action) => {})
      .addCase(API.createNewTask.fulfilled, (state, action) => {
        state.task = action.payload;
        state.tasks.push(action.payload);
        // console.log(action);
      })
      .addCase(API.createNewTask.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.getOneTask.pending, (state, action) => {})
      .addCase(API.getOneTask.fulfilled, (state, action) => {
        state.task = action.payload;
      })
      .addCase(API.getOneTask.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.closeTask.pending, (state, action) => {})
      .addCase(API.closeTask.fulfilled, (state, action) => {
        state.taskClose = true;
      })
      .addCase(API.closeTask.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.deleteOneTask.pending, (state, action) => {})
      .addCase(API.deleteOneTask.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.tasks = state.tasks.filter(el => el.id !== action.payload._id);
      })
      .addCase(API.deleteOneTask.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const taskReducer = TaskSlice.reducer;
