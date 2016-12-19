### `offlineWeb(connectivitySelector)`

Returns an offline storage extension that records analytics events in
[indexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API)
when offline, and resyncs those events when back online.

Like all offline storage extensions, this extension expects that
you're already storing a connectivity flag in your app's state.

The following example shows how you would use the native
[online and offline events](https://developer.mozilla.org/en/docs/Online_and_offline_events)
to toggle a connectivity flag in Redux, and record analytics events
offline.

```js
import { createStore, applyMiddleware } from 'redux';
import { createMiddleware, Extensions } from 'redux-gtm';

// define Redux action types
const UPDATE_CONNECTIVITY = 'UPDATE_CONNECTIVITY';

// create your Redux reducer
const initialState = {
  isConnected: true, // by default the app is assumed to have a connection
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONNECTIVITY {
      return Object.assign({}, state, { isConnected: action.payload });
    }
    default:
      return state;
  }
}

// map your redux action types to analytics events
const eventDefinitionsMap = {
  ...
};

// Create a connectivity selector (the important part),
// It accepts the Redux state, and it should return a boolean.
// The connectivity selector should return true when the app
// is online and false if it's offline.
const isConnected = state => state.isConnected;

// create the offline storage extension
const offlineStorage = Extensions.offlineWeb(isConnected);
// create the analytics middleware
const middleware = createMiddleware(eventDefinitionsMap, { offlineStorage });
// create the store
const store = createStore(reducer, applyMiddleware(middleware));

// now, add event listeners to update the connectivity flag
window.addEventListener('offline', () => {
  store.dispatch({
    type: UPDATE_CONNECTIVITY,
    payload: false,
  });
});
window.addEventListener('online', () => {
  store.dispatch({
    type: UPDATE_CONNECTIVITY,
    payload: true,
  });
});

// Whenever your app loses connection, your analytics events will now
// be saved offline until it regains its connection.
```
