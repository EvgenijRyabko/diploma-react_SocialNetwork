export const postsActions = {
  GET_USER_POSTS: 'GET_USER_POSTS',
  GET_USER_POSTS_ERROR: 'GET_USER_POSTS_ERROR',
  GET_USER_POSTS_SUCCESS: 'GET_USER_POSTS_SUCCESS',

  ADD_POST: 'ADD_POST',
  ADD_POST_ERROR: 'ADD_POST_ERROR',
  ADD_POST_SUCCESS: 'ADD_POST_SUCCESS',

  DELETE_POST: 'DELETE_POST',
  DELETE_POST_ERROR: 'DELETE_POST_ERROR',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
};

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get users actions
    case postsActions.GET_USER_POSTS:
      return { ...state, isLoading: true };
    case postsActions.GET_USER_POSTS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case postsActions.GET_USER_POSTS_SUCCESS:
      return { ...state, posts: action.payload, isLoading: false };

    // Add post actions
    case postsActions.ADD_POST:
      return { ...state, isLoading: true };
    case postsActions.ADD_POST_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case postsActions.ADD_POST_SUCCESS:
      return { ...state, isLoading: false };

    // Delete post actions
    case postsActions.DELETE_POST:
      return { ...state, isLoading: true };
    case postsActions.DELETE_POST_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case postsActions.DELETE_POST_SUCCESS:
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
