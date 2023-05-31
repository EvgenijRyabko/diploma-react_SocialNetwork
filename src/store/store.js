import { createStore, combineReducers, applyMiddleware } from 'react-redux';
import thunk from 'redux-thunk';
import usersReducer from './reducers/users-reducer';
import postsReducer from './reducers/posts-reducer';
import sidebarReducer from './reducers/sidebar-reducer';
import authReducer from './reducers/auth-reducer';

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  navigation: sidebarReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
