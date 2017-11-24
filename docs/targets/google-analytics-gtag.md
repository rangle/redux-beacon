# Google Analytics (gtag.js)


### Set Up

1. Sign up for Google Analytics if you haven't already, and
   [create a new web property](https://support.google.com/analytics/answer/1008015?hl=en). Make
   a note of your property's
   [tracking Id](https://support.google.com/analytics/answer/1008080).

2. Add the `gtag.js` [tracking snippet](https://developers.google.com/analytics/devguides/collection/gtagjs/) to your site.

3. Delete the following line from the tracking snippet: `gtag('config', 'GA_TRACKING_ID');`.

4. Import the target constructor then build the target using your tracking
   ID. Then provide the target when creating middleware or a meta reducer:

```js
import { GoogleAnalyticsGtag } from 'redux-beacon/targets/google-analytics-gtag';

const trackingID = 'YOUR_TRACKING_ID_FROM_STEP_1';

const middleware = createMiddleware(eventsMap, GoogleAnalyticsGtag(trackingID));
const metaReducer = createMetaReducer(eventsMap, GoogleAnalyticsGtag(trackingID));
```

### Page Tracking

To track a page view, create an event definition that returns an object with a
property `type` set to the string `"page"`. For example:

```js
const pageView = () => ({
  type: 'page',
});
```

Often you'll want to add some page view parameters as well:

```js
const pageView = (action) => ({
  type: 'page',
  page_title: action.payload.pageTitle,
  page_path: action.payload.route,
});
```

All parameters listed in the
[Google Analytics gtag.js docs](https://developers.google.com/analytics/devguides/collection/gtagjs/pages)
are supported:

To track a page view for a property with a different tracking ID than the one you
used to make the target, you can use the `trackingId` property:

```js
const pageView = (action) => ({
  type: 'page',
  trackingId: 'MY_OTHER_PROPERTY_ID',
  page_title: action.payload.pageTitle,
  page_path: action.payload.route,
});
```

To send a page view to multiple properties, you can provide an array of tracking IDs:

```js
const pageView = (action) => ({
  type: 'page',
  trackingId: ['MY_ORIGINAL_PROPERTY_ID', 'MY_OTHER_PROPERTY_ID'],
  page_title: action.payload.pageTitle,
  page_path: action.payload.route,
});
```

#### Typescript users

This target exposes a `PageView` interface that you can use for your page view
event definitions:

```ts
import { PageView } from 'redux-beacon/targets/google-analytics-gtag';

const pageView = (action): PageView => ({
  type: 'page',
  page_title: action.payload.pageTitle,
  page_path: action.payload.route,
});
```

### Event Tracking

To track an event, create an event definition that returns an object with a
property `type` set to the string `"event"`, and a `name` property set to an
event name. For example:

```js
const myEvent = () => ({
  type: 'event',
  name: 'event_name',
});
```

Often you'll want to add some event parameters as well:

```js
const myEvent = () => ({
  type: 'event',
  name: 'event_name',
  parameter_1: 'value_1',
  parameter_2: 'value_2',
});
```

All parameters listed in the
[Google Analytics gtag.js docs](https://developers.google.com/analytics/devguides/collection/gtagjs/events)
are supported.

#### Typescript users

This target exposes an `Event` interface that you can use for your event
event-definitions:

```ts
import { Event } from 'redux-beacon/targets/google-analytics-gtag';

const myEvent = (): Event => ({
  type: 'event',
  name: 'event_name',
  parameter_1: 'value_1',
  parameter_2: 'value_2',
});
```
