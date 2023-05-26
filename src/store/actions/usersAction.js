import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk('users/getAll', async (_, thunkApi) => {
  try {
    const response = await axios.get(`/api/users/getAll`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const getUserById = createAsyncThunk('users/getUserById', async (id, thunkApi) => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const postProfileImage = createAsyncThunk(
  'users/postProfileImage',
  async ({ userId, formData }, thunkApi) => {
    try {
      // eslint-disable-next-line guard-for-in
      console.log([...formData]);

      const response = await axios.post(`/api/users/uploadProfile/${userId}`, formData);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
    }
  },
);
