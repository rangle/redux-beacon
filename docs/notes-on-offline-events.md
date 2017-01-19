# Notes on Offline Events

Redux-Beacon comes with two extensions for measuring offline events,
one for web apps, and one for native apps. Both extensions read the
app's connection status from state, they record events in a persistent
storage service when the app is offline, and they push the events to
an analytics target when the app is back online.

The extensions add a timestamp to each event right before they're
saved offline. Whether or not you use this piece of meta data is up to
you and the types of analytics you want to track. For most analytics
events the exact time an event was recorded doesn't matter, and many
analytics services don't even provide reports that drill down to this
level of detail.

If your analytics reports warrant the need for the exact time an
analytics event happened you can first if you're on mobile depending
on target you may not need may queue the events for you. IF nothing
else works and you need to track the delta of when the one way to
intercept events is to create a higher order target, or a meta target

meta Target, higher order target

As an example here's how you'd create one for Google Analytics,

```js
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import { TRACKING_ID } from './constants';
import axios from 'axios';

const metaTarget = (events) => {
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
https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#qt


Nonetheless whether or not you use the timestamps, will largely
depend on your target analytics service, and the types of analytics
you want to measure. Google Analytics, for example does not provide an
easy way to generate analytics reports based on when analytics events
happened.


Redux-Beacon comes with two extensions for measuring offline events in
the browser and on mobile (React Native). Both these extensions read
the app's connection status from state, record events in a persistent
storage service (e.g. indexedDB) when the app is offline, and purge
those events when the app is back online. These extensions add a
timestamp to each event that gets saved offline.

two extensions
provide timeSaved timestamp
depending on target 3, and whether or not its important to you 1, 2
you can us the timestamp, and send it off
here's an example google analytics 5
also google analytics service worker (browser support allows) 4

When tracking offline events the first question

Redux-Beacon provides two extensions for queing events.

A common question, is does the time of those events

What do I want to share?
 * You have to decide whether the exact time events happen is
   important for the events you are trying to track.
 * You can track user time on task events without having to track the
   time an event happened.
 * On mobile you should check your target before using the
   offline-react-native extension, you might not need it, the GA
   target tracks offline events too.
 * Google Analytics service worker API
 * How to build a higher order target, for when you do need to track
   the exact time an event happened.


The [Offline Web] extension provides

you have to decide whether the precise time an event happened is important to you or not
funnel reports, user timing event
analytics services like Google Analytics don't provide ways to easily

The exact time an event occured isn't important for most analytics
consumers. Whether a page view event happened on a Monday

Most analytics events

Redux-Beacon provides the [Offline Web] extension that makes it easy
to track events offline.


for most analyitcs events the exact time the event happened doesn't really matter, pageviews, events
google analytics discards events older than

for the most part covered, but there is a react-native offline extension for when your target doesn't support offline event collection

check the services

one example google analytics

[](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#qt)
[](https://developers.google.com/web/updates/2016/07/offline-google-analytics) // poor support
[](https://ga-dev-tools.appspot.com/hit-builder/)

```js
// Example of the higher order target for Google Analytics
// intercept events that have a timeSaved parameter
// send those events using the measurement protocol
// for the rest of the events just send them to the GA target

```

Google Analytics Mobile
[iOS](https://developers.google.com/analytics/devguides/collection/ios/v3/dispatch)
[Android](https://developers.google.com/analytics/devguides/collection/android/v4/dispatch)

// Mobile
<
