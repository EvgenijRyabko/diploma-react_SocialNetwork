const GET_USERS = 'GET_USERS';
const GET_USERS_ERROR = 'GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS';

const GET_USED_BY_ID = 'GET_USED_BY_ID';
const GET_USED_BY_ID_ERROR = 'GET_USED_BY_ID';
const GET_USED_BY_ID_SUCCESS = 'GET_USED_BY_ID';

const ADD_USER = 'ADD_USER';
const ADD_USER_ERROR = 'ADD_USER';
const ADD_USER_SUCCESS = 'ADD_USER';

const DELETE_USER = 'DELETE_USER';
const DELETE_USER_ERROR = 'DELETE_USER';
const DELETE_USER_SUCCESS = 'DELETE_USER';

const pendingReducer = (state) => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  if (action) state.error = action.payload.error;
};

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersReducer = (action, state = initialState) => {
  switch (action.type) {
    // Get all users actions
    case GET_USERS:
      return pendingReducer(state);
    case GET_USERS_ERROR:
      return rejectedReducer(state, action);
    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload };

    // Get users by id actions
    case GET_USED_BY_ID:
      return pendingReducer(state);
    case GET_USED_BY_ID_ERROR:
      return rejectedReducer(state, action);
    case GET_USED_BY_ID_SUCCESS:
      return { ...state };

    // Add user actions
    case ADD_USER:
      return pendingReducer(state);
    case ADD_USER_ERROR:
      return rejectedReducer(state, action);
    case ADD_USER_SUCCESS:
      return { ...state };

    // Delete user actions
    case DELETE_USER:
      return pendingReducer(state);
    case DELETE_USER_ERROR:
      return rejectedReducer(state, action);
    case DELETE_USER_SUCCESS:
      return { ...state };

    // Default action
    default:
      return state;
  }
};
