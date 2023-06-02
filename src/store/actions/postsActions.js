import axios from 'axios';
import { postsActions } from '../reducers/posts-reducer';

export const getPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: postsActions.GET_USER_POSTS });
    const response = await axios.get(`/api/posts/${id}`);
    dispatch({ type: postsActions.GET_USER_POSTS_SUCCESS, payload: response.data });
    return response.data;
  } catch (e) {
    dispatch({
      type: postsActions.GET_USER_POSTS_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const createPost =
  (id, header = '', text) =>
  async (dispatch) => {
    try {
      dispatch({ type: postsActions.ADD_POST });
      const response = await axios.post(`/api/posts/${id}`, {
        header,
        text,
      });
      dispatch({ type: postsActions.ADD_POST_SUCCESS });
    } catch (e) {
      dispatch({
        type: postsActions.ADD_POST_ERROR,
        payload: e?.response?.data || 'Произошла непредвиденная ошибка',
      });
    }
  };

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: postsActions.DELETE_POST });
    const response = await axios.delete(`/api/posts/${id}`);
    dispatch({ type: postsActions.DELETE_POST_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: postsActions.DELETE_POST_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};
