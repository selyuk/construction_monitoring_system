import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

// ///

export const getAllProjects = createAsyncThunk(
  'projects',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/projects/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createNewProject = createAsyncThunk(
  'projects/create',
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData);
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/projects/', userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOneProject = createAsyncThunk(
  'projects/getOne',
  async (project_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/projects/${project_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/update',
  async ({ userData, project_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/projects/${project_id}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error, rejectWithValue);
      return error;
    }
  }
);

export const getHistoryProject = createAsyncThunk(
  'project/history',
  async (project_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/history/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        params: { project_id },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const deleteOneProject = createAsyncThunk(
  'project/delete',
  async (project_id, API) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/projects/${project_id}`, {
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

export const closeProject = createAsyncThunk(
  'project/close',
  async (project_id, API) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/projects/${project_id}/close`,
        null,
        {
          headers: {
            Authorization: `${token.toString()}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const createPayment = createAsyncThunk(
  'project/payment',
  async (project_id, API) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/projects/create-payment`, null, {
        headers: {
          Authorization: `${token.toString()}`,
          'Content-Type': 'application/json',
        },
        params: { project_id },
      });
      response.data.price &&
        alert(`Створенно чек на суму ${response.data.price}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const payPayment = createAsyncThunk(
  'project/pay',
  async (project_id, API) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/projects/pay`, null, {
        headers: {
          Authorization: `${token.toString()}`,
          'Content-Type': 'application/json',
        },
        params: { project_id },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getPayment = createAsyncThunk(
  'project/getPay',
  async (project_id, API) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/projects/get-payment/`, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        params: { project_id },
      });

      return response.data;
    } catch (error) {
      return API.rejectWithValue();
    }
  }
);
export const cancelPayment = createAsyncThunk(
  'project/cancelPayment',
  async (project_id, API) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/projects/cancel-payment', null, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
        params: { project_id },
      });
      return alert('Сплату скасовано');
    } catch (error) {
      return error;
    }
  }
);
