### `offlineReactNative(AsyncStorage, connectivitySelector)`

Returns an offline storage extension that records events in
[AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html)
when offline, and resyncs them when back online. The extension
adds a timestamp to each saved extension under the `timeSaved` key.

Like all offline storage extensions, this extension expects that
you're already storing a connectivity flag in your app's state.

----

#### Usage

If you haven't already done so, the first step is to track the
connection status in your state:

```js
import { NetInfo } from 'react-native';

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

// add event listeners to update the connectivity flag when the
// connection status changes
NetInfo.isConnected.addEventListener('change', (isConnected) => {
   store.dispatch({
    type: 'UPDATE_CONNECTIVITY',
    payload: isConnected,
  });
});
```

> [NetInfo docs](http://facebook.github.io/react-native/releases/0.38/docs/netinfo.html#netinfo)

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
import { AsyncStorage } from 'react-native';
import { offlineReactNative } from 'redux-beacon/extensions/offline-react-native';

...

// pass in the connectivity selector as the second parameter
const offlineStorage = offlineReactNative(AsyncStorage, isConnected);
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
