export const dialogsActions = {
  GET_MESSAGES: 'GET_MESSAGES',
  GET_MESSAGES_ERROR: 'GET_MESSAGES_ERROR',
  GET_MESSAGES_SUCCESS: 'GET_MESSAGES_SUCCESS',

  GET_DIALOGS: 'GET_DIALOGS',
  GET_DIALOGS_ERROR: 'GET_DIALOGS_ERROR',
  GET_DIALOGS_SUCCESS: 'GET_DIALOGS_SUCCESS',

  SEND_MESSAGE: 'SEND_MESSAGE',
  SEND_MESSAGE_ERROR: 'SEND_MESSAGE_ERROR',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',

  DELETE_MESSAGE: 'DELETE_MESSAGE',
  DELETE_MESSAGE_ERROR: 'DELETE_MESSAGE_ERROR',
  DELETE_MESSAGE_SUCCESS: 'DELETE_MESSAGE_SUCCESS',

  DELETE_DIALOG: 'DELETE_DIALOG',
  DELETE_DIALOG_ERROR: 'DELETE_DIALOG_ERROR',
  DELETE_DIALOG_SUCCESS: 'DELETE_DIALOG_SUCCESS',
};

const initialState = {
  user_dialogs: [],
  current_messages: [],
  isLoading: false,
  error: null,
};

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get user messages actions
    case dialogsActions.GET_MESSAGES:
      return { ...state, isLoading: true };
    case dialogsActions.GET_MESSAGES_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case dialogsActions.GET_MESSAGES_SUCCESS:
      return { ...state, current_messages: action.payload, isLoading: false };

    // Get user dialogs actions
    case dialogsActions.GET_DIALOGS:
      return { ...state, isLoading: true };
    case dialogsActions.GET_DIALOGS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case dialogsActions.GET_DIALOGS_SUCCESS:
      return { ...state, user_dialogs: action.payload, isLoading: false };

    // Send message actions
    case dialogsActions.SEND_MESSAGE:
      return { ...state, isLoading: true };
    case dialogsActions.SEND_MESSAGE_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case dialogsActions.SEND_MESSAGE_SUCCESS:
      return { ...state, isLoading: false };

    // Delete message actions
    case dialogsActions.DELETE_MESSAGE:
      return { ...state, isLoading: true };
    case dialogsActions.DELETE_MESSAGE_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case dialogsActions.DELETE_MESSAGE_SUCCESS:
      return { ...state, isLoading: false };

    // Delete dialog actions
    case dialogsActions.DELETE_DIALOG:
      return { ...state, isLoading: true };
    case dialogsActions.DELETE_DIALOG_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case dialogsActions.DELETE_DIALOG_SUCCESS:
      return { ...state, isLoading: false };

    // default actions
    default:
      return state;
  }
};
