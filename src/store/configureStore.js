import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
//import createSocketIoMiddleware from 'redux-socket.io';
import socketIOClient from 'socket.io-client';

import axios from 'axios';
import { sendCommandMiddleware } from 'resolve-redux';

//let socket = io('http://localhost:3000');

const CRITICAL_LEVEL = 100;
let socketIOFailCount = 0;

function initSocketIO(store) {
  const socketIO = socketIOClient('/');
  //let socketIoMiddleware = createSocketIoMiddleware(socketIO, 'server/');

  socketIO.on('event', event => {
    store.dispatch(JSON.parse(event))
  });
  socketIO.on('disconnect', () => {
    socketIOFailCount++;
    if (socketIOFailCount > CRITICAL_LEVEL) {
      window.location.reload();
    }
    initSocketIO(store);
  });
}

export default initialState => {
  if (!Immutable.isImmutable(initialState)) {
    initialState = Immutable(initialState);
  }

  const middleware = [sendCommandMiddleware({
    sendCommand: async command => axios.post('/api/commands', command)
  })];

  const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createStore(reducers, initialState, enhancer);

  if (typeof window === 'object') {
    initSocketIO(store);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
};