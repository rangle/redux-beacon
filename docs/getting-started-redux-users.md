# Getting Started (Redux Users)
[Step 1](#step-1), [Step 2](#step-2), [Step 3](#step-3), [Step 4](#step-4), [Next Steps](#next-steps)


In a nutshell: for each analytics event, pick out an event definition (listed in
each target's docs) and map it to an action. The map should be an object with
the action type as a key, and event definition as the value. Then, you simply
provide your target and the events map to Redux Beacon's `createMiddleware`
function.

### Step 1
Choose a target, and follow the setup instructions.

<details>
  <summary style="cursor:pointer">Click here for a list of targets and their setup docs.</summary>
  <ul>
    <li><a href="targets/google-analytics.html#setup">GoogleAnalytics: Setup</a></li>
    <li><a href="targets/google-analytics-gtag.html#setup">GoogleAnalyticsGtag: Setup</a></li>
    <li><a href="targets/google-tag-manager.html#setup">GoogleTagManager: Setup</a></li>
    <li><a href="targets/segment.html#setup">Segment: Setup</a></li>
    <li><a href="targets/amplitude.html#setup">Amplitude: Setup</a></li>
    <li>React Native:<ul>
        <li><a href="targets/react-native-google-analytics.html#setup">GoogleAnalytics: Setup</a></li>
        <li><a href="targets/react-native-google-tag-manager.html#setup">GoogleTagManager: Setup</a></li>
      </ul>
    </li>
  </ul>
</details>

<br>
> **[info]**
> Don't see the target you need?
> Follow the instructions [here](examples-and-recipes.md#how-to-create-own-target.md) to build your own.

### Step 2
Decide what you want to track and pick out the corresponding event definition:

<details>
  <summary style="cursor:pointer">Click here for a list of available event definitions</summary>
  <ul>
    <li><a href="targets/google-analytics.html#event-definitions">GoogleAnalytics: Event Definitions</a></li>
    <li><a href="targets/google-analytics-gtag.html#event-definitions">GoogleAnalyticsGtag: Event Definitions</a></li>
    <li><a href="targets/google-tag-manager.html#event-definitions">GoogleTagManager: Event Definitions</a></li>
    <li><a href="targets/segment.html#event-definitions">Segment: Event Definitions</a></li>
    <li><a href="targets/amplitude.html#event-definitions">Amplitude: Event Definitions</a></li>
    <li>React Native:<ul>
        <li><a href="targets/react-native-google-analytics.html#event-definitions">GoogleAnalytics: Event Definitions</a></li>
        <li><a href="targets/react-native-google-tag-manager.html#event-definitions">GoogleTagManager: Event Definitions</a></li>
      </ul>
    </li>
  </ul>
</details>

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
  eventCategory: 'Video',
  eventAction: action.type,
}));

// Match the event definition to a Redux action:
const eventsMap = {
  'PLAY_VIDEO': emitVideoPlayed,
};

// Create the middleware
const ga = GoogleAnalytics();
const gaMiddleware = createMiddleware(eventsMap, ga, { logger });
```

<details>
  <summary style="cursor:pointer">Click here for each target's usage instructions.</summary>
  <ul>
    <li><a href="targets/google-analytics.html#usage">GoogleAnalytics: Usage</a></li>
    <li><a href="targets/google-analytics-gtag.html#usage">GoogleAnalyticsGtag: Usage</a></li>
    <li><a href="targets/google-tag-manager.html#usage">GoogleTagManager: Usage</a></li>
    <li><a href="targets/segment.html#usage">Segment: Usage</a></li>
    <li><a href="targets/amplitude.html#usage">Amplitude: Usage</a></li>
    <li>React Native:<ul>
        <li><a href="targets/react-native-google-analytics.html#usage">GoogleAnalytics: Usage</a></li>
        <li><a href="targets/react-native-google-tag-manager.html#usage">GoogleTagManager: Usage</a></li>
      </ul>
    </li>
  </ul>
</details>

### Step 4
Follow the instructions [here](https://redux.js.org/docs/api/applyMiddleware.html) to
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
