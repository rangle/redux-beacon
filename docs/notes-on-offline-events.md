# Notes on Offline Events

Redux-Beacon comes with two extensions for measuring offline events,
one for web apps, and one for native apps. Both extensions read the
app's connection status from state, they record events in a persistent
storage service when the app is offline, and they push the events to
an analytics target when the app is back online.

> When working on a native app, you may not have to worry about offline
> event collection. Some analytics SDK's like the Google Analytics iOS
> and Android SDK's store events locally by default before dispatching
> them to the google analytics servers. See the
> [Dispatching (iOS SDK) docs](https://developers.google.com/analytics/devguides/collection/ios/v3/dispatch)
> and the
> [Dispatching (Android SDK) docs](https://developers.google.com/analytics/devguides/collection/android/v4/dispatch)

Both extensions add a timestamp to each event right before they're
saved offline. Whether or not you use this piece of meta data is up to
you and the types of analytics you want to track. For most analytics
events the exact time an event was recorded doesn't matter, and many
analytics services don't even provide reports that drill down to this
level of detail.

If you're working on a web app, and your analytics reports warrant the
need for exact-time analytics, you can use the offline event
timestamps directly, or if you need to compute derived data (like a
time delta) you can do so by making a higher order target.

For example, here's how you would create a higher order target to track
exact-time offline events in Google Analytics:

```js
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import { TRACKING_ID } from './constants';
import axios from 'axios';

const higherOrderTarget = (events) => {
  // filter out any events that were saved offline
  const currentEvents = events.filter(event => {
    if (event.timeSaved === undefined) {
      return true; // keep these events
    }
    // calculate the time since the event was saved
    const timeSinceEventSaved = Date.now() - event.timeSaved;
    // post the offline events to google analytics
    ga(function(tracker) {
       const url = 'https://www.google-analytics.com/collect';

       const params = [
         'v=1',
         `tid=${TRACKING_ID}`,
         `cid=${tracker.get('clientId')}`,
         `t=${event.hitType}`,
         `dp=${event.page}`,
         `qt=${timeSinceEventSaved}`,
       ].join('&');

       axios.post(`${url}?${params}`);
    });

  // push any events that were not saved offline directly to the target
  GoogleAnalytics(currentEvents);
};
```

Note that in Google Analytics, you have to use the measurement
protocal (i.e. hit the google analytics rest api directly) if you want
to specify the queue time parameter.
   * [Measurement Protocol Docs](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide)
   * [Queue Time Parameter Docs](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#qt)
