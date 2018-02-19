# OfflineReactNative

An offline storage extension that records events in
[AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html)
when offline, and resyncs them when back online. The extension
adds a timestamp to each saved extension under the `timeSaved` key.

Like all offline storage extensions, this extension expects that
you're already storing a connectivity flag in your app's state.

### Installation

```bash
npm install --save @redux-beacon/offline-react-native
```

### Import

```js
import OfflineReactNative from '@redux-beacon/offline-react-native';
```

### Usage

#### Step 1

The first step is to track the connection status in your state. Here's an
example of how you would do so using [NetInfo](http://facebook.github.io/react-native/releases/0.38/docs/netinfo.html#netinfo):

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

Initialize the extension and provide it when creating the middleware:

```js
import { AsyncStorage } from 'react-native';
import offlineReactNative from '@redux-beacon/offline-react-native';

// Pass the connectivity selector from Step 2 as the second parameter
const offlineStorage = offlineReactNative(AsyncStorage, isConnected);

// Create or import an events map and target.
// See "getting started" pages for instructions.

const middleware = createMiddleware(eventsMap, target, { offlineStorage });
```

Now, whenever your app loses connection, your analytics events will
now be saved offline until it regains its connection.
