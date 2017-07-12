import events from './record-events';
import Event from '../../_resolve/resolve-event';
import type { RecordAdded, RecordUpdate, RecordCompleted } from './record-events';

const { RECORD_ADDED, RECORD_UPDATED, RECORD_DELETED, RECORD_COMPLETED } = events;

const throwErrorIfNull = state => {
  if(state === null) {
    throw new Error('The aggregate has already been removed');
  }
}

const Aggregate = {
  name: 'record',
  initialState: {},
  eventHandlers: {
    [RECORD_ADDED]: (state: any, event: RecordAdded) => ({...event.payload}),
    [RECORD_UPDATED]: (state: any, event: RecordUpdate) => {
      state.text = event.payload.text;
      return state;
    },
    [RECORD_DELETED]: (state: any) => null,
    [RECORD_COMPLETED]: (state: any, event: RecordCompleted) => {
      state.completed = event.payload.completed;
      return state;
    }
  },
  commands: {
    addRecord:(state: any, command: RecordAdded) => {
      new Event(RECORD_ADDED, {
          record: command.payload.record
        })
    },
    updateRecord:(state: any, command: RecordUpdate) => {
      throwErrorIfNull(state);
      return new Event(RECORD_UPDATED, {
        record: command.payload.record
      });
    },
    deleteRecord:(state: any) => {
      throwErrorIfNull(state);
      return new Event(RECORD_DELETED);
    },
    completeRecord: (state: RecordCompleted, command: RecordCompleted) => {
      throwErrorIfNull(state);
      return state.completed === command.payload.completed
        ? null
        : new Event(RECORD_COMPLETED, {
            completed: command.payload.completed
          });
    }
  }
}

export default Aggregate;