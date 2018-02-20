# OfflineWeb

An offline storage extension that records analytics events in
[indexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API)
when offline, and resyncs those events when back online. The extension
adds a timestamp to each saved extension under the `timeSaved` key.

Like all offline storage extensions, this extension expects that
you're already storing a connectivity flag in your app's state.

### Installation

```bash
npm install --save @redux-beacon/offline-web
```

### Import

```js
import OfflineWeb from '@redux-beacon/offline-web';
```

### Usage

#### Step 1

The first step is to track the connection status in your state. Here's an
example of how you would do so using browser's in-built
[offline and online events](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events):

```js
const initialState = {
  isConnected: true, // by default the app is assumed to have a connection
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CONNECTIVITY' {
      return Object.assign({}, state, { isConnected: action.payload });
    }
    ...
    default:
      return state;
  }
}

window.addEventListener('offline', () => {
  store.dispatch({
    type: 'UPDATE_CONNECTIVITY',
    payload: false,
  });
});

window.addEventListener('online', () => {
  store.dispatch({
    type: 'UPDATE_CONNECTIVITY',
    payload: true,
  });
});
```

#### Step 2

Create a connectivity selector that accepts the state, and
returns your app's connection status:

```js
const isConnected = state => state.isConnected;
```

The connectivity selector should return a boolean:
 - `true` when the app is online
 - `false` when the app is offline

#### Step 3

Initialize the extension and provide it when creating a middleware or meta
reducer:

```js
import OfflineWeb from '@redux-beacon/offline-web';

// Pass the connectivity selector from Step 2 as the first parameter
const offlineStorage = offlineWeb(isConnected);

// Create or import an events map and target.
// See "getting started" pages for instructions.

const middleware = createMiddleware(eventsMap, target, { offlineStorage });
const metaReducer = createMetaReducer(eventsMap, target, { offlineStorage });
```

Now, whenever your app loses connection, your analytics events will
now be saved offline until it regains its connection.
