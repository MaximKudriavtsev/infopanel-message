import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default function configureStore(initialState) {
  const store = createStore(rootReducer,
    initialState,
    applyMiddleware(thunk),
    applyMiddleware(socketIoMiddleware));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  store.subscribe(() => {
    console.log('new client state', store.getState());
    io.emit('state', store.getState().toJS());
  });
  store.dispatch({ type: 'server/hello', data: 'Hello!' });

  return store
}