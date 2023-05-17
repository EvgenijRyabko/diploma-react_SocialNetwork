import { createSlice } from '@reduxjs/toolkit';
import { getUsers, getUserById } from '../actions/usersAction';

const initialState = {
  users: [],
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

export const usersReducer = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    // ****** Get posts by user id **************************
    [getUsers.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.users = action.payload;
      defaultFulfilledReducer(state);
    },
    [getUsers.pending]: pendingReducer,
    [getUsers.rejected]: rejectedReducer,

    // ****** Create post by user id **************************
    [getUserById.fulfilled]: defaultFulfilledReducer,
    [getUserById.pending]: pendingReducer,
    [getUserById.rejected]: rejectedReducer,

    // ****** Delete post by id **************************
    [getUserById.fulfilled]: defaultFulfilledReducer,
    [getUserById.pending]: pendingReducer,
    [getUserById.rejected]: rejectedReducer,
  },
});

export default usersReducer.reducer;
