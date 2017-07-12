import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import user from './reducers'
import { createStore } from 'redux';

import configureStore from './store/configureStore';
import App from './containers/App';

import './styles/app.css';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = configureStore(preloadedState);


// store.subscribe(() => {
//     console.log('new client state', store.getState());
//     //io.emit('state', store.getState().toJS());
//   });
//store.dispatch({ type: 'server/hello', data: 'Hello!' });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)