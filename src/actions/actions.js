import { createActions } from 'resolve-redux';
import recordAggregate from '../common/aggregates/record';
import clientActions from './clientActions';

export default createActions(recordAggregate, clientActions);