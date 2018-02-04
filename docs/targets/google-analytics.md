# Google Analytics

### Setup

1. Sign up for Google Analytics and
   [create a new web property](https://support.google.com/analytics/answer/1008015?hl=en).

2. Add the
   [JavaScript Tracking Snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
   to your site. Update the tracking snippet with your [tracking Id](https://support.google.com/analytics/answer/1008080).

    > **[info] Tip**
    > during development and testing it is often helpful to use the debug
    > version of analytics.js. Follow the instructions
    > [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/debugging)
    > to enable it.

#### Multiple Trackers Setup _(optional)_
 * This target supports named trackers. Add the following line to the tracking
   snippet for each named tracker:

   ```js
   ga('create', 'UA-XXXXX-Z', 'auto', 'clientTracker');
   ```
 * The tracker can be specified in each [event definition](#event-definitions)
   using the `tracker` property.

#### Ecommerce Plugin Setup _(optional)_
 * Add this line to the end of your tracking snippet: `ga('require',
   'ecommerce');`. This line must be added **after** you call `ga('create',
   'UA-XXXXX-Y')`.

    > **[warning]**
    > Google Analytics will _fail silently_ if you try to use these events
    > without adding the require call in your initial tracking code. It is also
    > **not** recommended to use GA's basic analytics plugin if you're also
    > going to use the enhanced ecommerce plugin.

#### Enhanced Ecommerce Plugin Setup _(optional)_
 * Add this line to the end of your tracking snippet: `ga('require',
   'ec');`. This line must be added **after** you call `ga('create',
   'UA-XXXXX-Y')`.

    > **[warning]**
    > Google Analytics will _fail silently_ if you try to use these events
    > without adding the require call in your initial tracking code. It is also
    > **not** recommended to use GA's basic analytics plugin if you're also
    > going to use the basic ecommerce plugin.

### Usage

```js
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';

const ga = GoogleAnalytics();

const middleware = createMiddleware(eventsMap, ga);
const metaReducer = createMetaReducer(eventsMap, ga);
```

### Event Definitions

* [`pageView`](#pageview)
* [`event`](#event)
* [`userTiming`](#usertiming)
* [`socialInteraction`](#socialinteraction)
* [`exception`](#exception)
* [`ecommItem`](#ecommitem)
* [`ecommTransaction`](#ecommtransaction)
* [`ecommImpression`](#ecommimpression)
* [`ecommProduct`](#ecommproduct)
* [`ecommPromotion`](#ecommpromotion)
* [`ecommAction`](#ecomaction)

#### pageView
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/pages

```js
import { makePageView } from 'redux-beacon/targets/google-analytics';

const pageView = makePageView((action, prevState, nextState) => {
 return {
   page: // fill me in,
   title: // (Optional) fill me in,
   location: // (Optional) fill me in,
 };
});
```

> **[danger] Duplicate Page Views**
> the last line of the tracking snippet `ga('send', 'pageview')` hits Google
> Analytics with a page view that matches the first loaded route. If you're
> tracking page views using Redux Beacon, be sure to remove this line so the
> initial page load isn't recorded twice.

##### Typescript Type Definition:

```typescript
import { PageView } from 'redux-beacon/targets/google-analytics';
```

<br>
#### event
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/events

```js
const event = (action, prevState, nextState) => { // rename me
  return {
    hitType: 'event',
    eventCategory: // fill me in,
    eventAction: // fill me in,
    eventLabel: // (Optional) fill me in,
    eventValue: // (Optional) fill me in,
  };
};
```

##### Typescript Type Definition:

```typescript
import { Event } from 'redux-beacon/targets/google-analytics';
```

<br>
#### userTiming
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings

```js
const userTiming = (action, prevState, nextState) => {
  return {
    hitType: 'timing',
    timingCategory: // fill me in,
    timingVar: // fill me in,
    timingValue: // fill me in,
    timingLabel: // (Optional) fill me in,
  };
};
```

##### Typescript Type Definition:

```typescript
import { UserTiming } from 'redux-beacon/targets/google-analytics';
```

<br>
#### socialInteraction
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions

```js
const socialInteraction = (action, prevState, nextState) => {
  return {
    hitType: 'social',
    socialNetwork: // fill me in,
    socialAction: // fill me in,
    socialTarget: // fill me in,
  };
};
```

##### Typescript Type Definition:

```typescript
import { SocialInteraction } from 'redux-beacon/targets/google-analytics';
```

<br>
#### exception
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions

```js
const exception = (action, prevState, nextState) => {
  return {
    hitType: 'exception',
    exDescription: // (Optional) fill me in,
    exFatal: // (Optional) fill me in,
  };
};
```

##### Typescript Type Definition:

```typescript
import { Exception } from 'redux-beacon/targets/google-analytics';
```

<br>
#### ecommItem
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup)

<br>
#### ecommTransaction
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup)

<br>
#### ecommSend
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup) or
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

<br>
#### ecommClear
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup) or
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

<br>
#### ecommImpression
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

<br>
#### ecommProduct
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

<br>
#### ecommPromotion
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

<br>
#### ecommAction
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)


### Google Analytics Ecommerce Plugin

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
