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
import { GoogleAnalytics } from 'redux-beacon/targets/gtm';

// Define an event
const someEvent = {
  eventFields: action => ({
    hitType: 'pageview',
    page: action.payload,
  }),
};

// Map the event to a Redux action
const eventsMap = {
   SOME_ACTION_TYPE: someEvent,
};

// Create the middleware
const middleware = createMiddleware(eventsMap, target);

// Apply the middleware when creating the Redux store
const store = createStore(reducer, applyMiddleware(middleware));
```
