import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPosts = createAsyncThunk('posts/getByUserID', async ({ id }, thunkApi) => {
  try {
    const response = await axios.get(`/api/posts/${id}`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});

export const createPost = createAsyncThunk(
  'posts/createInUser',
  async ({ id, header = '', text }, thunkApi) => {
    try {
      const response = await axios.post(`/api/posts/${id}`, {
        header,
        text,
      });
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
    }
  },
);

export const deletePost = createAsyncThunk('posts/deleteByPostId', async ({ id }, thunkApi) => {
  try {
    const response = await axios.delete(`/api/posts/${id}`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data || 'Произошла непредвиденная ошибка');
  }
});
