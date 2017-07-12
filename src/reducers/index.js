import { createReducer } from 'resolve-redux';
import recordsProjection from '../common/read-models/records';

const { name, eventHandlers } = recordsProjection;

export default createReducer({ name, eventHandlers });
