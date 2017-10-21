# Google Analytics Cordova

### Set Up

1. Sign up for Google Analytics if you haven't already, and
   [create a new mobile property](https://support.google.com/analytics/answer/1008015?hl=en). (Note, that it
   must be a mobile app property, not a web property.) Make a note of your property's
   [tracking Id](https://support.google.com/analytics/answer/1008080).

2. Add the
   [Google Analytics Cordova Plugin](https://github.com/danwilson/google-analytics-plugin)
   to your app.

    > **Tip:**
    > If you are using Ionic, initialize it in the onready callback. You may also want to install
     the Angular 2 tooling from [http://ionicframework.com/docs/native/google-analytics/](http://ionicframework.com/docs/native/google-analytics/)

3. Import the target, then provide it when creating middleware or a meta reducer:

   ```js
   import { CordovaGoogleAnalytics } from 'redux-beacon/targets/cordova-google-analytics';

   const middleware = createMiddleware(eventsMap, CordovaGoogleAnalytics());
   const metaReducer = createMetaReducer(eventsMap, CordovaGoogleAnalytics());
   ```

### Usage

Each event passed to the target is pushed to Google Analytics via the
Google Analytics Plugin which installs the Google Analytics mobile SDK. The
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
  * [Google Analytics Ionic Tracker with Offline Tracking](https://github.com/kokokenada/offline-tracking)

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
const pageView = (action): PageView => ({
  hitType: 'pageview',
  page: action.payload,
});
```
