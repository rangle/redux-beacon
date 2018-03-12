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

const DB_NAME = 'AnalyticsEvents';
const DB_VERSION = 1;

function openDB(dbName: string, version: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, version);

    request.onsuccess = event => {
      // Typescript support and the tests are once again working
      const db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = event => {
      /* Runs if the db hasn't been created yet, or if the requested db
       * version is greater than the existing db version.  This will run
       * before onsuccess */
      const db = request.result;
      db.createObjectStore('EventsStore', { autoIncrement: true });
    };
    request.onerror = reject;
  });
}

function save(events: any[], db: IDBDatabase): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['EventsStore'], 'readwrite');
    const objectStore = transaction.objectStore('EventsStore');

    const addEvents = objectStore.add(addTimestamp(events));
    addEvents.onsuccess = () => resolve(events);
    addEvents.onerror = reject;
  });
}

function purge(db: IDBDatabase) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['EventsStore'], 'readwrite');
    const objectStore = transaction.objectStore('EventsStore');
    const openCursor = objectStore.openCursor();

    let oldEvents: any[] = [];
    openCursor.onsuccess = event => {
      const cursor: IDBCursorWithValue = openCursor.result;
      if (cursor) {
        oldEvents = oldEvents.concat(cursor.value);
        objectStore.delete(cursor.key);
        cursor.continue();
      } else {
        resolve(oldEvents);
      }
    };
    openCursor.onerror = reject;
  });
}

export function offlineWeb(
  isConnected: ConnectivitySelector
): OfflineStorageExtension {
  return {
    saveEvents(events) {
      return openDB(DB_NAME, DB_VERSION).then(db => save(events, db));
    },
    purgeEvents(handlePurgedEvents: PurgedEventsHandler) {
      return openDB(DB_NAME, DB_VERSION)
        .then(purge)
        .then(handlePurgedEvents);
    },
    isConnected,
  };
}
