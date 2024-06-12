import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

/////
export const sendAttach = createAsyncThunk(
  'attachments/send',
  async ({ userData, project_id }, thunkApi) => {
    console.log(userData);
    try {
     
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/attachments/`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
        params: { project_id },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      alert(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAttach = createAsyncThunk(
  'attachments/get',
  async (attachment_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/attachments/${attachment_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAttach = createAsyncThunk(
  'attachments',
  async (attachm_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/attachments/${attachm_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
