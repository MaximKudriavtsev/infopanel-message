import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import user from './reducers'
import { createStore } from 'redux';

import configureStore from './store/configureStore';
import PreApp from './containers/PreApp';
//import EventPage from './components/EventPage';

import './styles/app.css';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = configureStore(preloadedState);

render(
  <Provider store={store}>
    <PreApp/>
  </Provider>,
  document.getElementById('root')
)