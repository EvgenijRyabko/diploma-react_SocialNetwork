import { createStore, combineReducers, applyMiddleware } from 'react-redux';
import thunk from 'redux-thunk';
import usersReducer from '../storeOld/reducers/users-reducer';

const rootReducer = combineReducers({
  users: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
