function addTimestamp(events) {
  return events.map(event =>
    Object.assign({}, event, { timeSaved: Date.now() })
  );
}

const STORE_KEY = 'EventsStore';

export function offlineReactNative(AsyncStorage, isConnected) {
  const saveEvents = events =>
    AsyncStorage.getItem(STORE_KEY)
      .then(JSON.parse)
      .then(oldEvents => {
        const stampedEvents = addTimestamp(events);
        return oldEvents ? oldEvents.concat(stampedEvents) : stampedEvents;
      })
      .then(JSON.stringify)
      .then(AsyncStorage.setItem.bind(null, STORE_KEY))
      .then(() => events);

  const purgeEvents = handlePurgedEvents =>
    AsyncStorage.getItem(STORE_KEY, () => AsyncStorage.removeItem(STORE_KEY))
      .then(JSON.parse)
      .then(handlePurgedEvents);

  return {
    isConnected,
    saveEvents,
    purgeEvents,
  };
}
