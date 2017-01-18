const addTimestamp = require('../utils/add-timestamp');

const DB_NAME = 'AnalyticsEvents';
const DB_VERSION = 1;

function openDB(dbName, version) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, version);

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      /* Runs if the db hasn't been created yet, or if the requested db
       * version is greater than the existing db version.  This will run
       * before onsuccess */
      const db = event.target.result;
      db.createObjectStore('EventsStore', { autoIncrement: true });
    };
    request.onerror = reject;
  });
}

function save(events, db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['EventsStore'], 'readwrite');
    const objectStore = transaction.objectStore('EventsStore');

    const addEvents = objectStore.add(addTimestamp(events));
    addEvents.onsuccess = () => resolve(events);
    addEvents.onerror = reject;
  });
}

function purge(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['EventsStore'], 'readwrite');
    const objectStore = transaction.objectStore('EventsStore');
    const openCursor = objectStore.openCursor();

    let oldEvents = [];
    openCursor.onsuccess = (event) => {
      const cursor = event.target.result;
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

function offlineWeb(isConnected) {
  return {
    saveEvents(events) {
      return openDB(DB_NAME, DB_VERSION).then(db => save(events, db));
    },
    purgeEvents(handlePurgedEvents) {
      return openDB(DB_NAME, DB_VERSION).then(purge).then(handlePurgedEvents);
    },
    isConnected,
  };
}

module.exports = { offlineWeb, addTimestamp };
