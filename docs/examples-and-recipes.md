# Examples & Recipes

1. [How to Track Pageviews in a React-Redux app](#how-to-track-pageviews-in-a-react-redux-app)
2. [How to Track Pageviews in an Angular-ngrx app](#how-to-track-pageviews-in-an-angular-ngrx-app)
4. [How to Emit Multiple Analytics Events per Redux Action](./utils/combine-events.md)
5. [How to Debounce Analytics Events](./utils/debounce-event.md)
6. [How to Validate Analytics Events](./utils/ensure.md)
7. [How to Send Analytics to Multiple Targets](#how-to-send-analytics-to-multiple-targets)
8. [How to Create Your Own Target](#how-to-create-your-own-target)

----




## How to Track Pageviews in a React-Redux app

The following example shows how you can use Redux Beacon to track page views in
an React app that uses Redux for state management, and React Router for
navigation.

```js
import { LOCATION_CHANGE } from 'react-router-redux';
import { createMiddleware } from 'redux-beacon';
import GoogleAnalytics, { trackPageView } from '@redux-beacon/google-analytics';

const eventsMap = {
  [LOCATION_CHANGE]: trackPageView(action => ({
    page: action.payload.pathname,
  })),
};

const gaMiddleware = createMiddleware(eventsMap, GoogleAnalytics());
```
 - Click [here](https://redux.js.org/docs/api/applyMiddleware.html) for instructions on how to apply the middleware to your store.
 - Click [here](https://codesandbox.io/s/4xkkp8n419) for a runnable example.




## How to Track Pageviews in an Angular-ngrx app

The following example shows how you can use Redux Beacon to track page views in
an Angular app that uses ngrx/store for state management.

```typescript
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { createMetaReducer, EventsMap } from 'redux-beacon';
import GoogleAnalytics, { trackPageView } from '@redux-beacon/google-analytics';

const eventsMap: EventsMap = {
  [ROUTER_NAVIGATION]: trackPageView(action => ({
    page: action.payload.routerState.url,
  })),
};

const gaMetaReducer = createMetaReducer(eventsMap, GoogleAnalytics());
```
 - Click [here](https://github.com/ngrx/platform/blob/master/docs/store/api.md#meta-reducers) for instructions on how to apply the meta reducer to your store.
 - Click [here](https://github.com/rangle/redux-beacon/tree/master/examples/ngrx-store) for a runnable example.




## How to Send Analytics to Multiple Targets

There is no limit to the number of middlewares or meta reducers you can create
and use. So, to send analytics to multiple targets, create a middleware or a
meta reducer for each target:

```js
import { createMiddleware } from 'redux-beacon';
import Amplitude from '@redux-beacon/amplitude';
import GoogleAnalytics from '@redux-beacon/google-analytics';

import { amplitudeEvents, gaEvents } from './my-event-definitions';

const amplitudeMiddleware = createMiddleware(amplitudeEvents, Amplitude());
const gaMiddleware = createMiddleware(gaEvents, GoogleAnalytics());

// Apply both middlewares to the store
```

Likewise, for `createMetaReducer`:

```js
import { createMetaReducer } from 'redux-beacon';
import Amplitude from '@redux-beacon/amplitude';
import GoogleAnalytics from '@redux-beacon/google-analytics';

import { amplitudeEvents, gaEvents } from './my-event-definitions';

const amplitudeMetaReducer = createMetaReducer(amplitudeEvents, Amplitude());
const gaMetaReducer = createMetaReducer(gaEvents, GoogleAnalytics());

// Add both meta reducers to the store
```

## How to Create Your Own Target

Both createMiddleware and createMetaReducer require a target as their second
parameter. A target is a function that Redux Beacon calls with an array of
generated analytics events. What a target does with the array of generated
events is up to the target's author, although the assumption is that the target
will send those events to an external analytics service.

```js
function myCustomTarget(events) {
 // - do something with the events.
 // - an event is usually an Object ({}), but doesn't have to be.
 // - an event should be serializable.
 // - events are what's returned from event definitions that you pair to action types.
 }
```

Most targets leverage an existing JavaScript sdk from an analytics service
(e.g. Google Analytics), but some might post their own server requests.

```js
// import an sdk, or install it as a global module
function myCustomTarget(events) {
  events.forEach(event => {
    switch (event.type) {
      case 'some_event_type_you_define':
        window.mySDK.someMethod(event.paramA, event.paramB);
        break;
      case 'some_other_event_type':
        window.mySDK.someOtherMethod(event.paramA);
        break;
      case 'yet_another_event_type':
        fetch('https://my-domain.com/my/analytics/endpoint', {
          method: 'POST',
          body: JSON.stringify(event.data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        });
        break;
      default:
        break;
    }
  });
}
```

If your target relies on an SDK attached to `window`, it is good practice to
first check that `window` exists to avoid issues during server side rendering.

If you decide to publish your target, please let us know so we can link to it in
our docs.
