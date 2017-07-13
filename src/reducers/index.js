import { combineReducers } from 'redux'
import { createReducer } from 'resolve-redux';

import recordsProjection from '../common/read-models/records';
import client from './client';

const { name, eventHandlers } = recordsProjection;
const server = createReducer({ name, eventHandlers });

export default combineReducers({
  server,
  client
});