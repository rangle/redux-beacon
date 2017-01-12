## Migrating From ReduxGTM
----

#### Imports

##### Before
```js
import { createMiddleware, createMetaReducer } from 'redux-gtm';
```

##### Now
```js
import { createMiddleware, createMetaReducer } from 'redux-beacon';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';
```

- You now import analytics targets.

----

#### Creating Event Definitions

##### Before
```js
const eventDefinition = {
  eventName: 'my-app-page-view',
  eventFields: (prevState, action) => ({
    route: action.payload.location.pathname,
  }),
  eventSchema: {
    event: value => typeof value === 'string',
    route: value => typeof value === 'string',
  },
};
```

##### Now
```js
const eventDefinition = {
  eventFields: (action, prevState) => ({
    event: 'my-app-page-view',
    route: action.payload.location.pathname,
  }),
  eventSchema: {
    event: value => typeof value === 'string',
    route: value => typeof value === 'string',
  },
};
```
 - There is no `eventName` property, you now return the event name in
   the `eventFields` method.
 - The parameters in the `eventFields` method have switched.

----

#### Creating Middleware and Meta Reducers

##### Before
```js
const middleware = createMiddleware(eventsMap);
const metaReducer = createMetaReducer(eventsMap);
```

##### Now
```js
const middleware = createMiddleware(eventsMap, GoogleTagManager);
const metaReducer = createMiddleware(eventsMap, GoogleTagManager);
```

- You now provide the analytics targets when creating middleware and
  meta reducers.
- Extensions are still provided as the last argument in both
  functions.

----

#### Event Helpers

##### Before
```js
import { EventHelpers } from 'redux-gtm';
const { createGApageview } = EventHelpers;

const eventDefinitionsMap = {
  ROUTE_CHANGED: {
    eventFields: (prevState, action) => {
      return createGApageview(action.payload);
    },
  }
};
```

##### Now
```js
import {
  PageView,
} from 'redux-beacon/targets/google-analytics';

const eventDefinitionsMap = {
  ROUTE_CHANGED: {
    eventFields: (action): PageView => ({
      hitType: 'pageview',
      page: action.payload,
    }),
  },
};
```

- Event helpers are now typed interfaces
