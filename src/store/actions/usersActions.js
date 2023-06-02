import axios from 'axios';
import { usersActions } from '../reducers/users-reducer';

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: usersActions.GET_USERS });
    const response = await axios.get(`/api/users/all`);
    dispatch({ type: usersActions.GET_USERS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: usersActions.GET_USERS_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: usersActions.GET_USER_BY_ID });
    const response = await axios.get(`/api/users/${id}`);
    dispatch({ type: usersActions.GET_USER_BY_ID_SUCCESS, payload: response.data[0] });
  } catch (e) {
    dispatch({
      type: usersActions.GET_USER_BY_ID_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const getUserFollowers = (id) => async (dispatch) => {
  try {
    dispatch({ type: usersActions.GET_FOLLOWERS });
    const response = await axios.get(`/api/users/${id}/followers`);
    dispatch({ type: usersActions.GET_FOLLOWERS_SUCCESS, payload: response.data });
    return response.data;
  } catch (e) {
    dispatch({
      type: usersActions.GET_FOLLOWERS_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const postProfileImage =
  ({ userId, formData }) =>
  async (dispatch) => {
    try {
      dispatch({ type: usersActions.POST_PROFILE_IMG });
      const response = await axios.post(`/api/users/uploadProfile/${userId}`, formData);
      dispatch({ type: usersActions.POST_PROFILE_IMG_SUCCESS, payload: response.data });
      return response.data;
    } catch (e) {
      dispatch({
        type: usersActions.POST_PROFILE_IMG_ERROR,
        payload: e?.response?.data || 'Произошла непредвиденная ошибка',
      });
    }
  };
