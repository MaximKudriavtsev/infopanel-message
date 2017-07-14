import { combineReducers } from 'redux'
import { createReducer } from 'resolve-redux';

import recordsProjection from '../common/read-models/records';
import client from './client';

const { name, eventHandlers } = recordsProjection;
export default createReducer({ name, eventHandlers });

// export default combineReducers({
//   server,
//   client
// });