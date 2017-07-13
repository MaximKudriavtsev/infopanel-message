
import createEventStore from 'resolve-es';
import createStorage from 'resolve-storage';
import createBus from 'resolve-bus';
import config from '../../resolve.config';

const storage = createStorage({
  driver: config.storage.driver(config.storage.params)
});
const busDriver = config.bus.driver;
const bus = createBus({ driver: busDriver(config.bus.params) });

const eventStore = createEventStore({ storage, bus });

const subscribe = bus.onEvent;

export { eventStore, subscribe };
