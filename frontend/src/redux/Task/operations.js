import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const getAllTask = createAsyncThunk(
  'user/tasks',
  async (project_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        params: { project_id },
      });
     
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error); //error.message
    }
  }
);
// add headers  Authorization: `${token}`,

export const createNewTask = createAsyncThunk(
  'task/create',
  async (newTask, { rejectWithValue }) => {
    try {
     
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/tasks/', newTask, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error); //error.message
    }
  }
);

export const getOneTask = createAsyncThunk(
  'task/getOne',
  async (task_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`/api/tasks/${task_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error); //error.message
    }
  }
);

export const updateOneTask = createAsyncThunk(
  'task/update',
  async ({ userData, task_id }, API) => {
    // console.log(userData, task_id);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(`/api/tasks/${task_id}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
   
      return data;
    } catch (error) {
      console.log(error);
      return error; //error.message
    }
  }
);

export const deleteOneTask = createAsyncThunk(
  'task/delete',
  async (task_id, API) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/tasks/${task_id}`,  {
        headers: {
          Authorization: `${token.toString()}`,
          'Content-Type': 'application/json',
        },
      });
     
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const closeTask = createAsyncThunk(
  'task/close',
  async (task_id, API) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`/api/tasks/${task_id}/close`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token.toString()}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
