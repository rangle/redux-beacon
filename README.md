# ReduxBeacon

Analytics integration for Redux and ngrx/store

 * decouple your analytics from your app logic
 * define your analytics events once, send them anywhere
 * track analytics offline
 * track analytics in React Native and Corodova

<b></b>

See the official docs for tutorials, examples, and more.

<b></b>

[![license](https://img.shields.io/github/license/rangle/redux-beacon.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/redux-beacon.svg)](https://www.npmjs.com/package/redux-beacon)
[![CircleCI](https://img.shields.io/circleci/project/github/rangle/redux-beacon.svg)](https://circleci.com/gh/rangle/redux-beacon)

```bash
npm install --save redux-beacon
```
----

### Quick Start

ReduxBeacon provides a way to map your Redux/ngrx actions to analytics
events. Analytics events are generated from event definitions, which
are mapped to actions in an event definitions map. Once generated,
ReduxBeacon sends the analytics events to a given target (e.g. Google
Analytics).

For example, say your app uses Redux to manage it's routes. Whenever a
route changes it fires an action:

```js
{
  type: 'LOCATION_CHANGED',
  payload: '/some/new/route',
}
```

That updates the `route` property in the Redux store:

```js
const initialState = {
  route: '/home',
}
```

Here's how you would set up ReduxBeacon to push an analytics event to
Google Tag Manager whenever the route changes in the app:

```js
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';

// Import createMiddleware, and a target from redux-beacon:
import { createMiddleware } from 'redux-beacon';
import { gtm } from 'redux-beacon/src/targets/gtm';

// Create an event definition that will be used to create
// an analytics event from the LOCATION_CHANGED action:
const pageviewEvent = {
  eventName: 'pageview',
  eventFields(prevState, action) {
    return { page: action.payload, referrer: prevState.route };
  },
};

// Map the event definition to the LOCATION_CHANGED action:
const eventsMap = {
  LOCATION_CHANGED: pageviewEvent,
};

// Create the middleware:
const middleware = createMiddleware(eventsMap, gtm);

// Apply the middleware when creating the Redux store
const store = createStore(reducer, applyMiddleware(middleware));

// Now, whenever the app dispatches the LOCATION_CHANGED action,
// ReduxBeacon will create a pageview event and push it to the
// gtm target.
```

### Documentation
The [official docs](https://rangle.github.io/redux-beacon/) contain
tutorials, examples, and a comprehensive API reference for the latest
npm version.

### License
This project is licensed under the MIT License.
