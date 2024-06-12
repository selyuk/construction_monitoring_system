import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
export const authHeader = token => {
  axios.defaults.headers.Authorization = `Bearer ${token}}`;
};
////
export const registerUser = createAsyncThunk(
  'auth/register',
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/register', newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data);
      const userId = jwtDecode(data.access_token);
      localStorage.setItem('userID', `${userId.sub}`);
      localStorage.setItem('token', `Bearer ${data.access_token}`);
      authHeader(data.access_token);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      console.log(user);
      const { data } = await axios.post('/api/auth/login', user, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log(data);
      const userId = jwtDecode(data.access_token);
      localStorage.setItem('userID', `${userId.sub}`);
      localStorage.setItem('token', `Bearer ${data.access_token}`);
      authHeader(data.access_token);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
