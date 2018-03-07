import * as flatten from 'array-flatten';
import isPromise from './is-promise';
import { Target, Extensions, LoggerExtension } from './types';

function registerEvents(
  events: Array<any>,
  target: Target,
  extensions: Extensions = {},
  prevState = {},
  action = {},
  nextState = {}
) {
  const { logger, offlineStorage } = extensions;

  const ifLoggerLog: LoggerExtension = (
    events,
    action,
    state,
    ...rest: any[]
  ) => {
    if (typeof logger === 'function') {
      logger(events, action, state, ...rest);
    }
  };

  const isEmptyArray = (arr: any[]) => Array.isArray(arr) && arr.length === 0;

  const passEventsToTarget = (e: any[]) => {
    if (!isEmptyArray(e)) {
      target(e);
    }
  };

  const handleEvents = (e: any[]) => {
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
