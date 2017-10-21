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

  if (offlineStorage === undefined) {
    target(events);
    ifLoggerLog(events, action, state);
  } else if (offlineStorage.isConnected(state)) {
    target(events);
    ifLoggerLog(events, action, state);
    offlineStorage.purgeEvents(oldEvents => {
      if (Array.isArray(oldEvents) && oldEvents.length > 0) {
        target(oldEvents);
        ifLoggerLog(oldEvents, null, null, false, true);
      }
    });
  } else {
    offlineStorage.saveEvents(events);
    ifLoggerLog(events, action, state, true, false);
  }
}

export default registerEvents;
