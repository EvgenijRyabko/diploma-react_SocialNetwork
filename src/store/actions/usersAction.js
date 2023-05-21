import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseurl = 'http://localhost:6060';

export const getUsers = createAsyncThunk('users/getAll', async (_, thunkApi) => {
  try {
    const response = await axios.get(`${baseurl}/api/users/getAll`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const getUserById = createAsyncThunk('users/getUserById', async (id, thunkApi) => {
  try {
    const response = await axios.get(`${baseurl}/api/users/${id}`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const postProfileImage = createAsyncThunk(
  'users/postProfileImage',
  async ({ id, file }, thunkApi) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${baseurl}/api/users/uploadProfile/${id}`,
        data: file,
      });
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
    }
  },
);
