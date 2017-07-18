import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import user from './reducers'
import { createStore } from 'redux';

import configureStore from './store/configureStore';
import App from './containers/App';

import './styles/app.css';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)