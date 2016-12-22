----

### createMiddleware(eventDefinitionsMap, target, extensions?)

Returns [Redux middleware](http://redux.js.org/docs/advanced/Middleware.html#the-final-approach)
that synchronizes actions to analytics events.

#### Parameters
 * `object` [eventDefinitionsMap](event-definitions-map.md)
 * `function` [target](../targets/index.md)
 * `object` *(optional)* [extensions](../extensions/index.md)

#### Example

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

// Create the target
const target = new GoogleAnalytics();

// Create the middleware
const middleware = createMiddleware(eventsMap, target);

// Apply the middleware when creating the Redux store
const store = createStore(reducer, applyMiddleware(middleware));

// Now, whenever the app dispatches the LOCATION_CHANGE action,
// Redux-Beacon will create a pageview event and push it to the
// Google Analytics target.
```
