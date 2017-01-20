### `offlineWeb(connectivitySelector)`

Returns an offline storage extension that records analytics events in
[indexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API)
when offline, and resyncs those events when back online. The extension
adds a timestamp to each saved extension under the `timeSaved` key.

Like all offline storage extensions, this extension expects that
you're already storing a connectivity flag in your app's state.

----

#### Usage

If you haven't already done so, the first step is to track the
connection status in your state:

```js
const initialState = {
  isConnected: true, // by default the app is assumed to have a connection
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CONNECTIVITY' {
      return Object.assign({}, state, { isConnected: action.payload });
    },
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

> [MDN, offline/online event docs](https://developer.mozilla.org/en/docs/Online_and_offline_events)

Next, create a connectivity selector that accepts the state, and
returns your app's connection status:

```js
const isConnected = state => state.isConnected;
```

> **<span style="color: #b51c1c">NB:</span>**
> The connectivity selector should return a boolean - `true` when the
> app is online, `false` if the app is offline.

Then, create the offline storage extension:

```js
import { offlineWeb } from 'redux-beacon/extensions/offline-react-native';

// pass in the connectivity selector as the first parameter
const offlineStorage = offlineWeb(isConnected);
```

Finally provide the offlineStorage extension when creating middleware
or a meta reducer:

```js
...

const middleware = createMiddleware(eventsMap, target, { offlineStorage });
const metaReducer = createMetaReducer(eventsMap, target, { offlineStorage });
```

Now, whenever your app loses connection, your analytics events will
now be saved offline until it regains its connection.
