# Getting Started (Redux Users)

### Step 1.
Choose a target, and follow the setup instructions.

 * [GoogleAnalytics: Setup](targets/google-analytics.md#setup)
 * [GoogleAnalyticsGtag: Setup](targets/google-analytics-gtag.md#setup)
 * [GoogleTagManager: Setup](targets/google-tag-manager.md#setup)
 * [Segment: Setup](targets/segment.md#setup)
 * [Amplitude: Setup](targets/amplitude.md#setup)
 * [CordovaGoogleAnalytics: Setup](targets/cordova-google-analytics.md#setup)
 * React Native:
   * [GoogleAnalytics: Setup](targets/react-native-google-analytics.md#setup)
   * [GoogleTagManager: Setup](targets/react-native-google-tag-manager.md#setup)

<br>
> **[info]**
> Don't see the target you need?
> Follow the instructions [here](customize/create-own-target.md) to build your own.

### Step 2.
Decide what you want to track and pick out the corresponding event definition:

 * [GoogleAnalytics: Event Definitions](targets/google-analytics.md#event-definitions)
 * [GoogleAnalyticsGtag: Event Definitions](targets/google-analytics-gtag.md#event-definitions)
 * [GoogleTagManager: Event Definitions](targets/google-tag-manager.md#event-definitions)
 * [Segment: Event Definitions](targets/segment.md#event-definitions)
 * [Amplitude: Event Definitions](targets/amplitude.md#event-definitions)
 * [CordovaGoogleAnalytics: Event Definitions](targets/cordova-google-analytics.md#event-definitions)
 * React Native:
   * [GoogleAnalytics: Event Definitions](targets/react-native-google-analytics.md#event-definitions)
   * [GoogleTagManager: Event Definitions](targets/react-native-google-tag-manager.md#event-definitions)

### Step 3.
Match the event definition to a Redux action.

For example, here's how you would match an event definition for a Google
Analytics event to the `PLAY_VIDEO` action:

```js
// Import your analytics target
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';

// Copy & paste the event definition you chose in step 2:
const event = (action, prevState, nextState) => { // rename me
  return {
    hitType: 'event',
    eventCategory: // fill me in,
    eventAction: // fill me in,
    eventLabel: // fill me in (optional),
    eventValue: // fill me in (optional),
  };
};

// Match the event definition to a Redux action:
const eventsMap = {
  'PLAY_VIDEO': emitEvent,
};
```

### Step 4.

Complete the event definition by filling in the object properties, then create the
middleware:

```js
// Import your analytics target
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
// Get Redux Beacon's middleware creator
import { createMiddleware } from 'redux-beacon';
// (Optional) Get Redux Beacon's logger so you can see the analytics
// events in the console.
import { logger } from 'redux-beacon/extensions/logger';

// Complete the event definition
const emitVideoPlayed = (action) => {
  return {
    hitType: 'event',
    eventCategory: 'Video',
    eventAction: action.type,
  };
};

const eventsMap = {
  'PLAY_VIDEO': emitVideoPlayed,
};

const analyticsMiddleware = createMiddleware(
  eventsMap,
  GoogleAnalytics(),
  { logger },
);
```

### Step 5.
Follow the instructions [here](https://redux.js.org/docs/api/applyMiddleware.html) for
applying the middleware to your store.

### Next Steps.
 - Repeat steps [2](#step-2) and [3](#step-3) for every event you want to track:
   1. Find the event definition for the thing you want to track.
   2. Match the event definition to a Redux action and complete the event definition.
 - As the number of events you track grows, it might make sense to move your
   event definitions and events map into their own files. Redux Beacon has no
   requirements on where these are kept. Have a discussion with your team on how
   you'd like to organize your app's analytics logic.
 - Check out our [utils](./utils/index.md), and [extensions](./extensions/index.md).
