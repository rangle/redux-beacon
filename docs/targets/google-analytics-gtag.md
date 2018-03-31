# Google Analytics (gtag.js)

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

### Setup

1. Sign up for Google Analytics and
   [create a new web property](https://support.google.com/analytics/answer/1008015?hl=en).

2. Add the [`gtag.js` tracking snippet](https://developers.google.com/analytics/devguides/collection/gtagjs/) to your site.

3. Install the target:

   ```bash
   npm install --save @redux-beacon/google-analytics-gtag
   ```

### Usage

```js
import GoogleAnalyticsGtag from '@redux-beacon/google-analytics-gtag';

// Create or import an events map.
// See "getting started" pages for instructions.

const trackingId = 'REPLACE_WITH_YOUR_TRACKING_ID';
const ga = GoogleAnalyticsGtag(trackingId);

const gaMiddleware = createMiddleware(eventsMap, ga);
const gaMetaReducer = createMetaReducer(eventsMap, ga);
```

### Event Definitions

* [`pageView`](#pageview)
* [`event`](#event)

Don't see your event listed? Please submit a pull request to
the [Redux Beacon repository](https://github.com/rangle/redux-beacon) with the
missing event. Use the source of the existing `event-helpers` to guide your
work. If you need any support feel free to make the pull request with all you're
able to do. We can fill in the gaps from there.

#### pageView
##### Docs:
https://developers.google.com/analytics/devguides/collection/gtagjs/pages

```js
import { trackPageView } from '@redux-beacon/google-analytics-gtag';

const pageView = trackPageView((action, prevState, nextState) => {
 return {
   title: /* (optional) */,
   location: /* (optional) */,
   path: /* (optional) */,
 };
}, /* (optional) tracking Id */, /* (optional) tracking Id */, ...);
```

{% hint style='danger' %}
The last line of the tracking snippet `gtag('config', 'GA_TRACKING_ID');` hits Google
Analytics with a page view that matches the first loaded route. If you're
tracking page views using Redux Beacon, be sure to remove this line so the
initial page load isn't recorded twice.
{% endhint %}

#### event
##### Docs:
https://developers.google.com/analytics/devguides/collection/gtagjs/events

```js
import { trackEvent } from '@redux-beacon/google-analytics-gtag';

const event = trackEvent((action, prevState, nextState) => {
  return {
    category: /* fill me in */,
    action: /* fill me in */,
    label: /* (optional) */,
    value: /* (optional) */,
  };
});
```
