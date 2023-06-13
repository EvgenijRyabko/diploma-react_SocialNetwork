import axios from 'axios';
import { dialogsActions } from '../reducers/dialogs-reducer';

export const getMessages = (source, target) => async (dispatch) => {
  try {
    dispatch({ type: dialogsActions.GET_MESSAGES });
    const response = await axios.get(`/api/dialogs/message/${source}/${target}`);
    dispatch({ type: dialogsActions.GET_MESSAGES_SUCCESS, payload: response.data });
    return response.data;
  } catch (e) {
    dispatch({
      type: dialogsActions.GET_MESSAGES_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const getDialogs = (id) => async (dispatch) => {
  try {
    dispatch({ type: dialogsActions.GET_DIALOGS });
    const response = await axios.get(`/api/dialogs/${id}`);
    dispatch({ type: dialogsActions.GET_DIALOGS_SUCCESS, payload: response.data });
    return response.data;
  } catch (e) {
    dispatch({
      type: dialogsActions.GET_DIALOGS_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const sendMessage = (source, target, text) => async (dispatch) => {
  try {
    dispatch({ type: dialogsActions.SEND_MESSAGE });
    const response = await axios.post(`/api/dialogs/message`, {
      source,
      target,
      text,
    });
    dispatch({ type: dialogsActions.SEND_MESSAGE_SUCCESS });
    return response.data;
  } catch (e) {
    dispatch({
      type: dialogsActions.SEND_MESSAGE_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: dialogsActions.DELETE_MESSAGE });
    const response = await axios.delete(`/api/dialogs/message/${id}`);
    dispatch({ type: dialogsActions.DELETE_MESSAGE_SUCCESS });
    return response.data;
  } catch (e) {
    dispatch({
      type: dialogsActions.DELETE_MESSAGE_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};

export const deleteDialog = (source, target) => async (dispatch) => {
  try {
    dispatch({ type: dialogsActions.DELETE_DIALOG });
    const response = await axios.delete(`/api/dialogs/`, {
      source,
      target,
    });
    dispatch({ type: dialogsActions.DELETE_DIALOG_SUCCESS });
    return response.data;
  } catch (e) {
    dispatch({
      type: dialogsActions.DELETE_DIALOG_ERROR,
      payload: e?.response?.data || 'Произошла непредвиденная ошибка',
    });
  }
};
