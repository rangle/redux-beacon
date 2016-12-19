function registerEvents(events, target, extensions, state, action) {
  const {
    logger,
    offlineStorage,
  } = extensions;

  const logEvents = (...args) => {
    if (typeof logger === 'function') {
      logger(...args);
    }
  };

  if (offlineStorage !== undefined) {
    const isConnected = offlineStorage.isConnected(state);
    if (!isConnected) {
      offlineStorage.saveEvents(events);
      logEvents(events, action, state, true, false);
    } else {
      target(events);
      logEvents(events, action, state);
      const onEventsPurged = (oldEvents) => {
        if (Array.isArray(oldEvents) && oldEvents.length > 0) {
          target(oldEvents);
          logEvents(oldEvents, null, null, false, true);
        }
      };
      offlineStorage.purgeEvents(onEventsPurged);
    }
  } else {
    target(events);
    logEvents(events, action, state);
  }
}

module.exports = registerEvents;
