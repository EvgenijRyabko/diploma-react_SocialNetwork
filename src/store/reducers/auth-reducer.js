const SIGN_IN = 'SIGN_IN';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';

const SIGN_UP = 'SIGN_UP';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

const SIGN_OUT = 'SIGN_OUT';
const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';

const pendingReducer = (state) => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  if (action) state.error = action.payload.error;
};

const initialState = {
  auth: {},
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action) {
    // Sign in actions
    case SIGN_IN:
      return pendingReducer(state);
    case SIGN_IN_ERROR:
      return rejectedReducer(state, action);
    case SIGN_IN_SUCCESS:
      return state;

    // Sign up actions
    case SIGN_UP:
      return pendingReducer(state);
    case SIGN_UP_ERROR:
      return rejectedReducer(state, action);
    case SIGN_UP_SUCCESS:
      return state;

    // Sign out actions
    case SIGN_OUT:
      return pendingReducer(state);
    case SIGN_OUT_ERROR:
      return rejectedReducer(state, action);
    case SIGN_OUT_SUCCESS:
      return state;

    // default actions
    default:
      return state;
  }
};
