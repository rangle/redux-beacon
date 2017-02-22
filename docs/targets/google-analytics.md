# Google Analytics

### Set Up

1. Sign up for Google Analytics if you haven't already, and
   [create a new web property](https://support.google.com/analytics/answer/1008015?hl=en). Make
   a note of your property's
   [tracking Id](https://support.google.com/analytics/answer/1008080).

2. Add the
   [JavaScript Tracking Snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
   to your site.

    > **Tip:**
    > during development and testing it is often helpful to use the debug
    > version of analytics.js. Follow the instructions
    > [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)
    > to enable it.

3. Import the target, then provide it when creating middleware or a meta reducer:

   ```js
   import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';

   const middleware = createMiddleware(eventsMap, GoogleAnalytics);
   const metaReducer = createMetaReducer(eventsMap, GoogleAnalytics);
   ```

### Usage

Each event passed to the target is pushed to Google Analytics using
the global tracker: `window.ga('send', [generated event])`. The
generated event must have a `hitType` property specifying the type of
analytics event and any other properties required for the event type.
Please refer to the [analytics.js docs](https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits)
for a listing of the most common user interaction events, and their
required properties.

> **Tip:**
> If you're using Typescript, there are typed interfaces for each of
> the above events (see below). If you're not using Typescript, you
> may want to quickly scan the type definitions instead of going
> through the analytics.js docs:
> [google-analytics/index.d.ts](https://github.com/rangle/redux-beacon/blob/master/src/targets/google-analytics/index.d.ts)

### Examples
  * [Google Analytics (Redux) Example](https://github.com/rangle/redux-beacon/tree/master/examples/google-analytics)
  * [Google Analytics (ngrx) Example](https://github.com/rangle/redux-beacon/tree/master/examples/google-analytics-ngrx)

### For Typescript Users

This target also exposes interfaces for common Google Analytics events:

```js
import {
  PageView,
  Event,
  UserTiming,
  SocialInteraction,
  Exception,
} from 'redux-beacon/targets/google-analytics';
```

To use them, just specify the event type in your event definition:

```js
const pageView = {
  eventFields: (action): PageView => ({
    hitType: 'pageview',
    page: action.payload,
  }),
};
```
