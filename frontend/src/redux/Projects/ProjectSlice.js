import { createSlice } from '@reduxjs/toolkit';
import * as API from './operations.js';

const initialState = {
  allProjects: null,
  project: null,
  history: null,
  price: null,
  paymentPage: false,
  paymentInfo: null,
};

const handlePending = state => {};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(API.getAllProjects.pending, handlePending)
      .addCase(API.getAllProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload;
      })
      .addCase(API.getAllProjects.rejected, (state, action) => {
        console.log(state, action);
      })
      .addCase(API.createNewProject.pending, (state, action) => {})
      .addCase(API.createNewProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.allProjects.push(action.payload);
      })
      .addCase(API.createNewProject.rejected, (state, action) => {
        console.log(action, 'REJECTED');
      })
      .addCase(API.getOneProject.pending, (state, action) => {})
      .addCase(API.getOneProject.fulfilled, (state, action) => {
        state.project = action.payload;
      })
      .addCase(API.getOneProject.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.updateProject.pending, (state, action) => {})
      .addCase(API.updateProject.fulfilled, (state, action) => {
        // state.project = action.payload;
        console.log(action);
      })
      .addCase(API.updateProject.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.getHistoryProject.pending, (state, action) => {})
      .addCase(API.getHistoryProject.fulfilled, (state, action) => {
        // state.project = action.payload;
        state.history = action.payload;
      })
      .addCase(API.getHistoryProject.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.deleteOneProject.pending, (state, action) => {})
      .addCase(API.deleteOneProject.fulfilled, (state, action) => {
        // state.project = action.payload;
        // state.history = action.payload;
        state.allProjects = state.allProjects.filter(
          el => el.id !== action.payload._id
        );
      })
      .addCase(API.deleteOneProject.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.closeProject.pending, (state, action) => {})
      .addCase(API.closeProject.fulfilled, (state, action) => {
        // state.project = action.payload;
        // state.history = action.payload;
      })
      .addCase(API.closeProject.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.createPayment.pending, (state, action) => {})
      .addCase(API.createPayment.fulfilled, (state, action) => {
        state.price = action.payload.price;
        state.paymentInfo = true;
        // state.project = action.payload;
        // state.history = action.payload;
      })
      .addCase(API.createPayment.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.payPayment.pending, (state, action) => {})
      .addCase(API.payPayment.fulfilled, (state, action) => {
        state.paymentPage = true;
        state.paymentInfo = false;
        // state.price = action.payload.price;
        // state.project = action.payload;
        // state.history = action.payload;
      })
      .addCase(API.payPayment.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.getPayment.pending, (state, action) => {})
      .addCase(API.getPayment.fulfilled, (state, action) => {
        // state.paymentPage = true;
        state.paymentInfo = action.payload;
        // state.project = action.payload;
        // state.history = action.payload;
      })
      .addCase(API.getPayment.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(API.cancelPayment.pending, (state, action) => {})
      .addCase(API.cancelPayment.fulfilled, (state, action) => {})
      .addCase(API.cancelPayment.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const projectReducer = projectSlice.reducer;
