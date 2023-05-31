import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './reducers/sidebar-reducer';
import postsReducer from './reducers/posts-reducer';
import usersReducer from './reducers/users-reducer';
import authReducer from './reducers/auth-reducer';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  posts: postsReducer,
  users: usersReducer,
  authReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });
