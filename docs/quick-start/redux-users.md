# Redux Beacon Quick Start

Say your app uses Redux to manage its routes. Whenever a
route changes it fires an action:

```js
{
  type: 'LOCATION_CHANGE',
  payload: '/some/new/route',
}
```

> If you're using Redux with React or Angular there are a couple of
> libraries that can automatically sync your router changes with the
> Redux store:
> [ng2-redux-router](https://github.com/dagstuan/ng2-redux-router) for
> Angular users, and [react-redux-router](https://github.com/reactjs/react-router-redux)
> for React users.

Here's how you would set up Redux-Beacon to push a pageview event to
Google Analytics whenever the route changes:

```js
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';

// Import createMiddleware and a target
import { createMiddleware } from 'redux-beacon';
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';

// Define an event
const pageView = {
  eventFields: action => ({
    hitType: 'pageview',
    page: action.payload,
  }),
};

// Map the event to a Redux action
const eventsMap = {
   LOCATION_CHANGE: pageView,
};

// Create the middleware
const middleware = createMiddleware(eventsMap, GoogleAnalytics);

// Apply the middleware when creating the Redux store
const store = createStore(reducer, applyMiddleware(middleware));
```

Now, whenever the app dispatches the `LOCATION_CHANGE` action,
Redux-Beacon will create a pageview event and push it to the Google
Analytics target.

----

### [See A Full Working Example](https://github.com/rangle/redux-beacon/tree/master/examples/google-analytics)
