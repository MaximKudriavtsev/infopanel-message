/* @flow */

// $FlowIgnore
import Immutable from 'seamless-immutable';
// $FlowIgnore
import { MERGE } from 'resolve-redux/dist/actions';

import type, { RecordAdded, RecordUpdate, RecordDeleted, RecordCompleted } from '../aggregates/record-events';
import events from '../aggregates/record-events';

const { MESSAGE_ADDED, MESSAGE_UPDATED, MESSAGE_DELETED, RECORD_COMPLETED } = events;

export default {
  name: 'records',
  initialState: Immutable({ records: [] }),

  eventHandlers: {
    [MESSAGE_ADDED]: (state: any, event: MessageAdded) => state.setIn(
        ['records'],
        [
          {
            aggregateId: event.aggregateId,
            record: event.payload
          }
        ].concat(state.records)
      ),
    [MESSAGE_UPDATED]: (state: any, event: MessageUpdate) =>
      state.setIn(
        ['records'],
        state.records.map(
          record =>
            (record.aggregateId === event.aggregateId
              ? { ...record, record: event.payload }
              : record)
        )
      ),
    [MESSAGE_DELETED]: (state: any, event: MessageDeleted) =>
      state.setIn(
        ['records'],
        state.records.filter(item => item.aggregateId !== event.aggregateId)
      )
  }
};