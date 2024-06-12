import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const generationInviteCode = createAsyncThunk(
  'create/inviteCode',
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/projects/generate-invite',
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
      return error;
    }
  }
);

export const accpetInviteCode = createAsyncThunk(
  'accept/inviteCode',
  async (code, API) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/projects/accept-invite', null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      
        params: { code },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(API);
      return error;
    }
  }
);
// export const getAllTask = createAsyncThunk(
//   'user/tasks',
//   async (project_id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('/api/tasks/', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `${token}`,
//         },
//         params: { project_id },
//       });
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error); //error.message
//     }
//   }
// );
// headers: {
//   'Content-Type': 'application/json',
//   Authorization: `${token}`,
// },
