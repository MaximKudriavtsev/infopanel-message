import events from './record-events';
import Event from '../../_resolve/resolve-event';
import type { MessageAdded, MessageUpdate, MessageCompleted } from './record-events';

const { MESSAGE_ADDED, MESSAGE_UPDATED, MESSAGE_DELETED, MESSAGE_COMPLETED } = events;

const throwErrorIfNull = state => {
  if(state === null) {
    throw new Error('The aggregate has already been removed');
  }
}

const Aggregate = {
  name: 'record',
  initialState: {},
  // eventHandlers: {
  //   [RECORD_ADDED]: (state: any, event: RecordAdded) => ({...event.payload}),
  //   [RECORD_UPDATED]: (state: any, event: RecordUpdate) => {
  //     state.text = event.payload.text;
  //     return state;
  //   },
  //   [RECORD_DELETED]: (state: any) => null,
  //   [RECORD_COMPLETED]: (state: any, event: RecordCompleted) => {
  //     state.completed = event.payload.completed;
  //     return state;
  //   }
  // },
  commands: {
    addMessage:(state: any, command: MessageAdded) => {
      return new Event(MESSAGE_ADDED, command.payload)
    },
    updateMessage:(state: any, command: MessageUpdate) => {
      throwErrorIfNull(state);
      return new Event(MESSAGE_UPDATED, command.payload);
    },
    deleteMessage:(state: any) => {
      throwErrorIfNull(state);
      return new Event(MESSAGE_DELETED, {});
    },
  }
}

export default Aggregate;