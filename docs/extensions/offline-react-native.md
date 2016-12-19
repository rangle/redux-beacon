### `offlineReactNative(AsyncStorage, connectivitySelector)`

Returns an offline storage extension that records events in
[AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html)
when offline, and resyncs them when back online.

Like all offline storage extensions, this extension expects that
you're already storing a connectivity flag in your app's state.

The following example shows how you would use
[NetInfo](http://facebook.github.io/react-native/releases/0.38/docs/netinfo.html#netinfo)
in a React Native app to toggle a connectivity flag in Redux, and
record analytics events offline.

```js
import {
  NetInfo,
  AsyncStorage,
} from 'react-native';
import { createMiddleware, Extensions } from 'redux-gtm';
import { GoogleTagManager } from 'react-native-google-analytics-bridge';

// initialize your GTM container
GoogleTagManager.openContainerWithID('GTM-XXXXXX');

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
const offlineStorage = Extensions.offlineReactNative(AsyncStorage, isConnected);

// create a custom data layer extension
const customDataLayer = {
  push: GoogleTagManager.pushDataLayerEvent,
};

// create the analytics middleware
const middleware = createMiddleware(
  eventDefinitionsMap,
  { customDataLayer, offlineStorage }
);
// create the store
const store = createStore(reducer, applyMiddleware(middleware));

// now, add event listeners to update the connectivity flag
NetInfo.isConnected.addEventListener('change', (isConnected) => {
  store.dispatch({
    type: UPDATE_CONNECTIVITY,
    payload: isConnected,
  });
});

// Whenever your app loses connection, your analytics events will now
// be saved offline until it regains its connection.
```
