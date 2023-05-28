import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk('users/getAll', async (_, thunkApi) => {
  try {
    const response = await axios.get(`/api/users/all`);
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

export const getUserFollowers = createAsyncThunk('users/getUserFollowers', async (id, thunkApi) => {
  try {
    const response = await axios.get(`/api/users/${id}/followers`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const postProfileImage = createAsyncThunk(
  'users/postProfileImage',
  async ({ userId, formData }, thunkApi) => {
    try {
      const response = await axios.post(`/api/users/uploadProfile/${userId}`, formData);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
    }
  },
);
