
// $FlowIgnore
//import Immutable from 'seamless-immutable';
// $FlowIgnore

import type, { TodoAdded, TodoEdited, TodoCompleted, TodoDeleted } from '../aggregates/record-events';
import events from '../aggregates/record-events';

const { RECORD_ADDED, RECORD_UPDATED, RECORD_DELETED, RECORD_COMPLETED } = events;

export default {
  name: 'records',
  initialState: {},
  //Immutable({ todos: [] }),

  eventHandlers: {
    [RECORD_ADDED]: (state: any, event: RecordAdded) => {
      // state.setIn(
      //   ['records'],
      //   [
      //     {
      //       aggregateId: event.aggregateId,
      //       completed: event.payload.completed,
      //       text: event.payload.text
      //     }
      //   ].concat(state.todos)
      // )
    },
    [RECORD_DELETED]: (state: any, event: TodoDeleted) =>{

      // state.setIn(
      //   ['todos'],
      //   state.todos.filter(item => item.aggregateId !== event.aggregateId)
      // ),
    },
    [RECORD_UPDATED]: (state: any, event: TodoEdited) =>{
      console.log('handlerInProjections');

      // state.setIn(
      //   ['todos'],
      //   state.todos.map(
      //     todo =>
      //       (todo.aggregateId === event.aggregateId
      //         ? { ...todo, text: event.payload.text }
      //         : todo)
      //   )
      // )
    },
    [RECORD_COMPLETED]: (state: any, event: RecordCompleted) => {

    }


  }
}