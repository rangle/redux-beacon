import {
  ConnectivitySelector,
  OfflineStorageExtension,
  PurgedEventsHandler,
} from 'redux-beacon';

function addTimestamp(events: any[]) {
  return events.map(event =>
    Object.assign({}, event, { timeSaved: Date.now() })
  );
}

const STORE_KEY = 'EventsStore';

export function offlineReactNative(
  AsyncStorage: any,
  isConnected: ConnectivitySelector
): OfflineStorageExtension {
  const saveEvents = (events: any[]) =>
    AsyncStorage.getItem(STORE_KEY)
      .then(JSON.parse)
      .then((oldEvents: any[]) => {
        const stampedEvents = addTimestamp(events);
        return oldEvents ? oldEvents.concat(stampedEvents) : stampedEvents;
      })
      .then(JSON.stringify)
      .then(AsyncStorage.setItem.bind(null, STORE_KEY))
      .then(() => events);

  const purgeEvents = (handlePurgedEvents: PurgedEventsHandler) =>
    AsyncStorage.getItem(STORE_KEY, () => AsyncStorage.removeItem(STORE_KEY))
      .then(JSON.parse)
      .then(handlePurgedEvents);

  return {
    isConnected,
    saveEvents,
    purgeEvents,
  };
}
