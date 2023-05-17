import { createSlice } from '@reduxjs/toolkit';
import { getPosts, createPost, deletePost } from '../actions/postsAction';

const initialState = {
  posts: [],
};

const pendingReducer = (state) => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  if (action) state.error = action.payload.error;
};

const defaultFulfilledReducer = (state) => {
  rejectedReducer(state);
};

export const studentsReducer = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    // ****** Get posts by user id **************************
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      defaultFulfilledReducer(state);
    },
    [getPosts.pending]: pendingReducer,
    [getPosts.rejected]: rejectedReducer,

    // ****** Create post by user id **************************
    [createPost.fulfilled]: defaultFulfilledReducer,
    [createPost.pending]: pendingReducer,
    [createPost.rejected]: rejectedReducer,

    // ****** Delete post by id **************************
    [deletePost.fulfilled]: defaultFulfilledReducer,
    [deletePost.pending]: pendingReducer,
    [deletePost.rejected]: rejectedReducer,
  },
});

export default studentsReducer.reducer;
