import flatten from 'flatten';
import isPromise from '../utils/is-promise';

function registerEvents(
  events,
  target,
  extensions = {},
  prevState = {},
  action = {},
  nextState = {}
) {
  const { logger, offlineStorage } = extensions;

  const ifLoggerLog = (...args) => {
    if (typeof logger === 'function') {
      logger(...args);
    }
  };

  const isEmptyArray = e => Array.isArray(e) && e.length === 0;

  const passEventsToTarget = e => {
    if (!isEmptyArray(e)) {
      target(e);
    }
  };

  const handleEvents = e => {
    if (offlineStorage === undefined) {
      passEventsToTarget(e);
      ifLoggerLog(e, action, prevState);
    } else if (offlineStorage.isConnected(nextState)) {
      passEventsToTarget(e);
      ifLoggerLog(e, action, prevState);
      offlineStorage.purgeEvents(oldEvents => {
        if (!isEmptyArray(oldEvents)) {
          target(oldEvents);
          ifLoggerLog(oldEvents, null, null, false, true);
        }
      });
    } else {
      offlineStorage.saveEvents(e);
      ifLoggerLog(e, action, prevState, true, false);
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
