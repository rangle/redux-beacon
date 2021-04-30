# Getting Started (Redux Users)

In a nutshell: for each analytics event, pick out an event definition (listed in
each target's docs) and map it to an action. The map should be an object with
the action type as a key, and event definition as the value. Then, you simply
provide your target and the events map to Redux Beacon's `createMiddleware`
function.

### Step 1
Choose a target, and follow the setup instructions.

* [GoogleAnalytics: Setup](targets/google-analytics.md#setup)
* [GoogleAnalyticsGtag: Setup](targets/google-analytics-gtag.md#setup)
* [GoogleTagManager: Setup](https://rangle.gitbook.io/redux-beacon/index/google-tag-manager#setup)
* [Segment: Setup](targets/segment.md#setup)
* [Amplitude: Setup](targets/amplitude.md#setup)
* React Native:
  * [GoogleAnalytics: Setup](targets/react-native-google-analytics.md#setup)
  * [GoogleTagManager: Setup](targets/react-native-google-tag-manager.md#setup)
  * [Segment: Setup](targets/react-native-segment.md#setup)

{% hint style='info' %}
Don't see the target you need?
Follow the instructions [here](examples-and-recipes.md#how-to-create-own-target.md) to build your own.
{% endhint %}

### Step 2
Decide what you want to track and pick out the corresponding event definition:

* [GoogleAnalytics: Event Definitions](targets/google-analytics.md#event-definitions)
* [GoogleAnalyticsGtag: Event Definitions](targets/google-analytics-gtag.md#event-definitions)
* [GoogleTagManager: Event Definitions](https://rangle.gitbook.io/redux-beacon/index/google-tag-manager#event-definitions)
* [Segment: Event Definitions](targets/segment.md#event-definitions)
* [Amplitude: Event Definitions](targets/amplitude.md#event-definitions)
* React Native:
  * [GoogleAnalytics: Event Definitions](targets/react-native-google-analytics.md#event-definitions)
  * [GoogleTagManager: Event Definitions](targets/react-native-google-tag-manager.md#event-definitions)
  * [Segment: Setup](targets/react-native-segment.md#setup)

### Step 3
Complete the event definition by filling in the object properties, and match it
to a Redux action.

For example, say you want to intercept a `PLAY_VIDEO` Redux action and track it
as a Google Analytics event:

```js
import { createMiddleware } from 'redux-beacon';
import GoogleAnalytics, { trackEvent } from '@redux-beacon/google-analytics';

import logger from '@redux-beacon/logger'; // optional

// Copy & paste the event definition you chose in step 2, then fill it in.
const emitVideoPlayed = trackEvent(action => ({
  category: 'Videos',
  action: action.type,
}));

// Match the event definition to a Redux action:
const eventsMap = {
  'PLAY_VIDEO': emitVideoPlayed,
};

// Create the middleware
const ga = GoogleAnalytics();
const gaMiddleware = createMiddleware(eventsMap, ga, { logger });
```

* [GoogleAnalytics: Usage](targets/google-analytics.md#usage)
* [GoogleAnalyticsGtag: Usage](targets/google-analytics-gtag.md#usage)
* [GoogleTagManager: Usage](https://rangle.gitbook.io/redux-beacon/index/google-tag-manager#usage)
* [Segment: Usage](targets/segment.md#usage)
* [Amplitude: Usage](targets/amplitude.md#usage)
* React Native:
  * [GoogleAnalytics: Usage](targets/react-native-google-analytics.md#usage)
  * [GoogleTagManager: Usage](targets/react-native-google-tag-manager.md#usage)
  * [Segment: Setup](targets/react-native-segment.md#setup)

### Step 4
Follow the instructions [here](https://redux.js.org/api/applymiddleware/) to
apply the middleware to your store.

----

### Next Steps

##### Track More Events:
Repeat steps [2](#step-2) and [3](#step-3) for every event you want to track. In a nutshell:
  1. Find the event definition for the thing you want to track.
  2. Match the event definition to a Redux action then complete the event definition.

##### Decide Where to put Analytics Logic:
As the number of events you track grows, it might make sense to move your event
definitions and events map into their own files. Redux Beacon has no
requirements on where these are kept. Have a discussion with your team on how
you'd like to organize your app's analytics logic.

##### Check Out the Recipes:
We have a number of recipes to get you started with Redux Beacon. Check them
out [here](examples-and-recipes.md).

##### Check Out the Extensions:
We have extensions for logging and for buffering analytics events
offline. Check them out [here](extensions/index.md).
