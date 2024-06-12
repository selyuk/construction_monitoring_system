import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const getComments = createAsyncThunk(
  'comments/get',
  async (task_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/comments/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        params: { task_id },
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const createComments = createAsyncThunk(
  'comments/create',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/comments/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const editComments = createAsyncThunk(
  'comments/edit',
  async ({ data, comment_id }, API) => {
    console.log({ data }, comment_id);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/comments/${comment_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const deleteComments = createAsyncThunk(
  'comments/delete',
  async (comment_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/comments/${comment_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
