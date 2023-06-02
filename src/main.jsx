import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Router from './router/Router';
import { store } from './store/store';
import { setupStore } from './storeOld/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const store = setupStore();

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>,
);
