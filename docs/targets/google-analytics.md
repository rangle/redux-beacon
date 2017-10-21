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

   const middleware = createMiddleware(eventsMap, GoogleAnalytics());
   const metaReducer = createMetaReducer(eventsMap, GoogleAnalytics());
   ```

    > **Warning:**
    > the last line of the tracking snippet `ga('send', 'pageview')` hits Google
    > Analytics with a page view that matches the first loaded route. If you're
    > tracking page views using Redux Beacon, be sure to remove this line so the
    > initial page load isn't recorded twice.

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

### Google Analytics Ecommerce Plugin

The Google Analytics target has support for the basic ecommerce plugin built-in.
In order to use the ecommerce features, you first need to add this line to the
end of your tracking snippet: `ga('require', 'ecommerce');`

You must add the require **after** you call `ga('create', 'UA-XXXXX-Y')`.
Once you've done this, you can use the ecommerce specific events to track
transactions:

- addTransaction
- addItem
- ecommSend
- ecommClear

You can also provide a `customTrackerId` field to your event object if you want
to use a custom tracker object to track events. Ex:

```js
  const events = [
    {
      hitType: 'addItem',
      customTrackerId: 'myTracker',
      ...
    },
  ];
```

**Note:**
Google Analytics will _fail silently_ if you try to use these events without adding the
require call in your initial tracking code. It is also **not** recommended to use GA's
basic analytics plugin if you're also going to use the enhanced ecommerce plugin.

See the google developer docs for
[more information on creating a custom tracker](https://developers.google.com/analytics/devguides/collection/analyticsjs/creating-trackers) and
for [using the google analytics ecommerce plugin](https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce)

### Google Analytics Enhanced Ecommerce Plugin

The Google Analytics target also has support for the enhanced ecommerce plugin.
It should be noted that it isn't recommended to use both the enhanced plugin and
basic plugin together without multiple trackers. Please refer to the [enhanced
ecommerce plugin documentation here](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)

To use the enhanced ecommerce plugin, first add this line to the end of your
tracking snippet: `ga('require', 'ec');` Again, this must be added after the
create call with your Google Analytics UA code.

This allows you to use these enhanced ecommerce events:

- addProduct
- addImpression
- addPromo
- addAction

The basic actions are used as well:

- ecommSend
- ecommClear
- addItem
- addTransaction

In order to tell Redux Beacon which version of the ecommerce plugin you're using,
your events should pass the `ecommType` key:

```JavaScript
const events = [
  {
    hitType: 'addImpression',
    ecommType: 'enhanced',
    // ...
  },
];
```

For adding custom actions, you can specify the type of action using the key `actionName`.

```JavaScript
const events = [
  {
    hitType: 'addAction',
    ecommType: 'enhanced',
    actionName: 'click',
    // ...
  },
];
```

Everything else works the same as in the basic ecommerce plugin. Please see [the
developer documentation for more information on how these events work.](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)

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
const pageView = (action): PageView => ({
  hitType: 'pageview',
  page: action.payload,
});
```
