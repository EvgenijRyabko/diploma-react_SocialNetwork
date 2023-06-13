export const usersActions = {
  GET_USERS: 'GET_USERS',
  GET_USERS_ERROR: 'GET_USERS_ERROR',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',

  GET_USER_BY_ID: 'GET_USER_BY_ID',
  GET_USER_BY_ID_ERROR: 'GET_USER_BY_ID_ERROR',
  GET_USER_BY_ID_SUCCESS: 'GET_USER_BY_ID_SUCCESS',

  GET_FOLLOWERS: 'GET_FOLLOWERS',
  GET_FOLLOWERS_ERROR: 'GET_FOLLOWERS_ERROR',
  GET_FOLLOWERS_SUCCESS: 'GET_FOLLOWERS_SUCCESS',

  POST_PROFILE_IMG: 'POST_PROFILE_IMG',
  POST_PROFILE_IMG_ERROR: 'POST_PROFILE_IMG_ERROR',
  POST_PROFILE_IMG_SUCCESS: 'POST_PROFILE_IMG_SUCCESS',

  ADD_USER: 'ADD_USER',
  ADD_USER_ERROR: 'ADD_USER_ERROR',
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

  DELETE_USER: 'DELETE_USER',
  DELETE_USER_ERROR: 'DELETE_USER_ERROR',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',

  SUBSCRIBE: 'SUBSCRIBE',
  SUBSCRIBE_ERROR: 'SUBSCRIBE_ERROR',
  SUBSCRIBE_SUCCESS: 'SUBSCRIBE_SUCCESS',

  UNSUBSCRIBE: 'UNSUBSCRIBE',
  UNSUBSCRIBE_ERROR: 'UNSUBSCRIBE_ERROR',
  UNSUBSCRIBE_SUCCESS: 'UNSUBSCRIBE_SUCCESS',

  GET_FRIENDS: 'GET_FRIENDS',
  GET_FRIENDS_ERROR: 'GET_FRIENDS_ERROR',
  GET_FRIENDS_SUCCESS: 'GET_FRIENDS_SUCCESS',
};

const initialState = {
  users: [],
  currentUser: {},
  isLoading: false,
  error: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get all users actions
    case usersActions.GET_USERS:
      return { ...state, isLoading: true };
    case usersActions.GET_USERS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.GET_USERS_SUCCESS:
      return { ...state, users: action.payload, isLoading: false };

    // Get users by id actions
    case usersActions.GET_USER_BY_ID:
      return { ...state, isLoading: true };
    case usersActions.GET_USER_BY_ID_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.GET_USER_BY_ID_SUCCESS:
      return { ...state, currentUser: action.payload, isLoading: false };

    // Add user actions
    case usersActions.ADD_USER:
      return { ...state, isLoading: true };
    case usersActions.ADD_USER_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.ADD_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload], isLoading: false };

    // Get user followers actions
    case usersActions.GET_FOLLOWERS:
      return { ...state, isLoading: true };
    case usersActions.GET_FOLLOWERS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.GET_FOLLOWERS_SUCCESS:
      return { ...state, isLoading: false };

    // Get user friends actions
    case usersActions.GET_FRIENDS:
      return { ...state, isLoading: true };
    case usersActions.GET_FRIENDS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.GET_FRIENDS_SUCCESS:
      return { ...state, isLoading: false };

    // Post profile image actions
    case usersActions.POST_PROFILE_IMG:
      return { ...state, isLoading: true };
    case usersActions.POST_PROFILE_IMG_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.POST_PROFILE_IMG_SUCCESS:
      return { ...state, isLoading: false };

    // Delete user actions
    case usersActions.DELETE_USER:
      return { ...state, isLoading: true };
    case usersActions.DELETE_USER_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        isLoading: false,
      };

    // Subscribe to user actions
    case usersActions.SUBSCRIBE:
      return { ...state, isLoading: true };
    case usersActions.SUBSCRIBE_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.SUBSCRIBE_SUCCESS:
      return { ...state, isLoading: false };

    // Unsubscribe from user actions
    case usersActions.UNSUBSCRIBE:
      return { ...state, isLoading: true };
    case usersActions.UNSUBSCRIBE_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case usersActions.UNSUBSCRIBE_SUCCESS:
      return { ...state, isLoading: false };

    // Default action
    default:
      return state;
  }
};
