import createEventStore from 'resolve-es';
import createStorage from 'resolve-storage';
import createBus from 'resolve-bus';
import storageDriver from 'resolve-storage-mongo';
import busDriver from 'resolve-bus-memory';
import { LOCAL_MONGO, USERS_COLLECTION } from '../../config.js';
import Immutable from 'seamless-immutable';

const usersEventStore = createEventStore({
    storage: createStorage({
        driver: storageDriver({
            url: LOCAL_MONGO,
            collection: USERS_COLLECTION
        })
    }),
    bus: createBus({
        driver: busDriver()
    })
});

function makeUserFromEvent(_, payload) {
    const fields = [
        'displayName',
        'firstName',
        'lastName',
        'email',
    ];

    return fields.reduce((acc, key) => {
        if (key in payload) {
            acc[key] = payload[key];
        }
        return acc;
    }, {});
}
const usersProjection = {
    name: 'users',
    initialState: Immutable({}),

    eventHandlers: {
        UserCreated(state, event) {
            const id = event.aggregateId;
            return state.setIn([id], makeUserFromEvent([id], event.payload));
        },

        UserUpdated(state, event) {
            const id = event.aggregateId;
            return state[id]
                ? state.merge(
                    {
                        [id]: makeUserFromEvent([id], event.payload)
                    },
                      { deep: true }
                  )
                : state;
        },

        UserDeleted(state, event) {
            const id = event.aggregateId;
            if (!state[id]) {
                return state;
            }

            return state.without(id);
        }
    }
};

export default {
  usersProjection,
  usersEventStore
}