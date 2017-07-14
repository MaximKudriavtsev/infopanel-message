/* @flow */

// $FlowIgnore
import Immutable from 'seamless-immutable';
// $FlowIgnore
import { MERGE } from 'resolve-redux/dist/actions';

import type, { RecordAdded, RecordUpdate, RecordDeleted, RecordCompleted } from '../aggregates/record-events';
import events from '../aggregates/record-events';

const { RECORD_ADDED, RECORD_UPDATED, RECORD_DELETED, RECORD_COMPLETED } = events;

export default {
  name: 'records',
  initialState: Immutable({ records: [] }),

  eventHandlers: {
    [RECORD_ADDED]: (state: any, event: RecordAdded) => state.setIn(
        ['records'],
        [
          {
            aggregateId: event.aggregateId,
            record: event.payload.record
          }
        ].concat(state.records)
      ),
    [RECORD_DELETED]: (state: any, event: RecordDeleted) =>
      state.setIn(
        ['records'],
        state.records.filter(item => item.aggregateId !== event.aggregateId)
      ),
    [RECORD_UPDATED]: (state: any, event: RecordUpdate) =>
      state.setIn(
        ['records'],
        state.records.map(
          record =>
            (record.aggregateId === event.aggregateId
              ? { ...record, record: event.payload.record }
              : record)
        )
      ),
    [RECORD_COMPLETED]: (state: any, event: RecordCompleted) => state.setIn(
        ['record'],
        state.record.map(
          record =>
            (record.aggregateId === event.aggregateId
              ? { ...record, completed: event.payload.completed }
              : record)
        )
      ),
    [MERGE]: (state, event) => (state
      ? state.setIn(
         ['records'],
        state.records.concat(event.state.records)
      )
      : Immutable(event.state))
  }
};