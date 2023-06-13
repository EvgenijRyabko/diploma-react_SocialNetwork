import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { usersReducer } from './reducers/users-reducer';
import { postsReducer } from './reducers/posts-reducer';
import { sidebarReducer } from './reducers/sidebar-reducer';
import { authReducer } from './reducers/auth-reducer';
import { dialogsReducer } from './reducers/dialogs-reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  dialogs: dialogsReducer,
  navigation: sidebarReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, composedEnhancer);
