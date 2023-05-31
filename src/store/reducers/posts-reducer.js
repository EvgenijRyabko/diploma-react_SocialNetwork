const GET_USER_POSTS = 'GET_USER_POSTS';
const GET_USER_POSTS_ERROR = 'GET_USER_POSTS_ERROR';
const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';

const ADD_POST = 'ADD_POST';
const ADD_POST_ERROR = 'ADD_POST_ERROR';
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

const DELETE_POST = 'DELETE_POST';
const DELETE_POST_ERROR = 'DELETE_POST';
const DELETE_POST_SUCCESS = 'DELETE_POST';

const pendingReducer = (state) => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  if (action) state.error = action.payload.error;
};

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get users actions
    case GET_USER_POSTS:
      return pendingReducer(state);
    case GET_USER_POSTS_ERROR:
      return rejectedReducer(state, action);
    case GET_USER_POSTS_SUCCESS:
      return { ...state, posts: action.payload, isLoading: false };

    // Add post actions
    case ADD_POST:
      return pendingReducer(state);
    case ADD_POST_ERROR:
      return rejectedReducer(state, action);
    case ADD_POST_SUCCESS:
      return { ...state, posts: [...state.posts, action.payload], isLoading: false };

    // Delete post actions
    case DELETE_POST:
      return pendingReducer(state);
    case DELETE_POST_ERROR:
      return rejectedReducer(state, action);
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        isLoading: false,
      };

    // Default action
    default:
      return state;
  }
};
