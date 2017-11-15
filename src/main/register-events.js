import isPromise from '../utils/is-promise';
import flatten from 'lodash.flatten';


function registerEvents(
  events,
  target,
  extensions = {},
  state = {},
  action = {}
) {
  const { logger, offlineStorage } = extensions;

  const ifLoggerLog = (...args) => {
    if (typeof logger === 'function') {
      logger(...args);
    }
  };

  const handleEvents = (e) => {
    if (offlineStorage === undefined) {
      target(e);
      ifLoggerLog(e, action, state);

    } else if (offlineStorage.isConnected(state)) {
      target(e);
      ifLoggerLog(e, action, state);
      offlineStorage.purgeEvents(oldEvents => {
        if (Array.isArray(oldEvents) && oldEvents.length > 0) {
          target(oldEvents);
          ifLoggerLog(oldEvents, null, null, false, true);
        }
      });
    } else {
      offlineStorage.saveEvents(e);
      ifLoggerLog(e, action, state, true, false);
    }
  };

  const asyncEvents = events.filter(isPromise);
  const syncEvents = events.filter(event => !isPromise(event));

  handleEvents(syncEvents);

  return Promise.all(asyncEvents)
    .then(flatten)
    .then(handleEvents);
}

export default registerEvents;
