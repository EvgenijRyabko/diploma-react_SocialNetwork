import axios from 'axios';
import { authActions } from '../reducers/auth-reducer';

export const signIn = (payload) => async (dispatch) => {
  try {
    dispatch({ type: authActions.SIGN_IN });
    const response = await axios.post(`/api/auth/signin`, payload);
    dispatch({ type: authActions.SIGN_IN_SUCCESS, payload: response.data });
    return response.data;
  } catch (e) {
    dispatch({
      type: authActions.SIGN_IN_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const signOut = (token) => async (dispatch) => {
  try {
    dispatch({ type: authActions.SIGN_OUT });
    const response = await axios.post(`/api/auth/signout`, { token });
    dispatch({ type: authActions.SIGN_OUT_SUCCESS }, response.data);
  } catch (e) {
    dispatch(
      { type: authActions.SIGN_OUT_ERROR },
      e?.response?.data || 'Произошла непредвиденная ошибка',
    );
  }
};

export const signUp = (payload) => async (dispatch) => {
  try {
    dispatch({ type: authActions.SIGN_UP });
    const response = await axios.post(`/api/auth/signup`, payload);
    dispatch({ type: authActions.SIGN_UP_SUCCESS }, response.data);
  } catch (e) {
    dispatch(
      { type: authActions.SIGN_UP_ERROR },
      e?.response?.data || 'Произошла непредвиденная ошибка',
    );
  }
};
