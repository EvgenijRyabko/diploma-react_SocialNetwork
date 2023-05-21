import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp, signOut } from '../actions/authAction';

const initialState = {
  operator: {},
  isLoading: false,
  error: '',
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

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    // ****** Get posts by user id **************************
    [signIn.fulfilled]: (state, action) => {
      state.operator = action.payload;
      defaultFulfilledReducer(state);
    },
    [signIn.pending]: pendingReducer,
    [signIn.rejected]: rejectedReducer,

    // ****** Create post by user id **************************
    [signUp.fulfilled]: defaultFulfilledReducer,
    [signUp.pending]: pendingReducer,
    [signUp.rejected]: rejectedReducer,

    // ****** Delete post by id **************************
    [signOut.fulfilled]: defaultFulfilledReducer,
    [signOut.pending]: pendingReducer,
    [signOut.rejected]: rejectedReducer,
  },
});

export default authReducer.reducer;
