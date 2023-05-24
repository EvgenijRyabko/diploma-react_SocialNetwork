import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk('auth/signin', async (payload, thunkApi) => {
  try {
    const response = await axios.post(`/api/auth/signin`, payload);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const signOut = createAsyncThunk('auth/signout', async ({ token }, thunkApi) => {
  try {
    const response = await axios.post(`/api/auth/signout`, { token });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const signUp = createAsyncThunk('auth/signup', async (payload, thunkApi) => {
  try {
    const response = await axios.post(`/api/auth/signup`, payload);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});
