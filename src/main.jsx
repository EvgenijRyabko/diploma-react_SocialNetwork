import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './router/Router';
import { setupStore } from './store/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>,
);
