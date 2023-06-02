export const authActions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',

  SIGN_UP: 'SIGN_UP',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',

  SIGN_OUT: 'SIGN_OUT',
  SIGN_OUT_ERROR: 'SIGN_OUT_ERROR',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
};

const pendingReducer = (state) => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  if (action) state.error = action.payload.error;
};

const initialState = {
  token: '',
  user_id: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Sign in actions
    case authActions.SIGN_IN:
      return { ...state, isLoading: true };
    case authActions.SIGN_IN_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case authActions.SIGN_IN_SUCCESS:
      return { ...state, token: action.payload.token, user_id: action.payload.id_user };

    // Sign up actions
    case authActions.SIGN_UP:
      return pendingReducer(state);
    case authActions.SIGN_UP_ERROR:
      return rejectedReducer(state, action);
    case authActions.SIGN_UP_SUCCESS:
      return state;

    // Sign out actions
    case authActions.SIGN_OUT:
      return pendingReducer(state);
    case authActions.SIGN_OUT_ERROR:
      return rejectedReducer(state, action);
    case authActions.SIGN_OUT_SUCCESS:
      return state;

    // default actions
    default:
      return state;
  }
};
