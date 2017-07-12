import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import axios from 'axios';
import { sendCommandMiddleware } from 'resolve-redux';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');


export default function configureStore(initialState) {
  const middleware = [sendCommandMiddleware({
    sendCommand: async command => axios.post('/create_data', command)
  })];


  const store = createStore(rootReducer,
    initialState,
    applyMiddleware(thunk, socketIoMiddleware, ...middleware));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}