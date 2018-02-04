# Google Analytics

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

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

#### _Multiple Trackers Setup_
 * This target supports named trackers. Add the following line to the tracking
   snippet for each named tracker:

   ```js
   ga('create', 'UA-XXXXX-Z', 'auto', 'clientTracker');
   ```
 * The tracker can be specified in each [event definition](#event-definitions)
   using the `tracker` property.

#### _Ecommerce Plugin Setup_
 * Add this line to the end of your tracking snippet: `ga('require',
   'ecommerce');`. This line must be added **after** you call `ga('create',
   'UA-XXXXX-Y')`.

    > **[warning]**
    > Google Analytics will _fail silently_ if you try to use these events
    > without adding the require call in your initial tracking code. It is also
    > **not** recommended to use GA's basic analytics plugin if you're also
    > going to use the enhanced ecommerce plugin.

#### _Enhanced Ecommerce Plugin Setup_
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
* [`ecommSend`](#ecommsend)
* [`ecommClear`](#ecommclear)
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
   page: /* fill me in */,
   title: /* (optional) */,
   location: /* (optional) */,
 };
}, /* (optional) tracker name */ );
```

> **[danger] Duplicate Page Views**
> the last line of the tracking snippet `ga('send', 'pageview')` hits Google
> Analytics with a page view that matches the first loaded route. If you're
> tracking page views using Redux Beacon, be sure to remove this line so the
> initial page load isn't recorded twice.

<br>

#### event
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/events

```js
import { makeEvent } from 'redux-beacon/targets/google-analytics';

const event = makeEvent((action, prevState, nextState) => {
  return {
    eventCategory: /* fill me in */,
    eventAction: /* fill me in */,
    eventLabel: /* (optional) */,
    eventValue: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### userTiming
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings

```js
import { makeUserTiming } from 'redux-beacon/targets/google-analytics';

const userTiming = makeUserTiming((action, prevState, nextState) => {
  return {
    timingCategory: /* fill me in */,
    timingVar: /* fill me in */,
    timingValue: /* fill me in */,
    timingLabel: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### socialInteraction
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions

```js
import { makeSocialInteraction } from 'redux-beacon/targets/google-analytics';

const socialInteraction = makeSocialInteraction((action, prevState, nextState) => {
  return {
    socialNetwork: /* fill me in */,
    socialAction: /* fill me in */,
    socialTarget: /* fill me in */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### exception
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions

```js
import { makeException } from 'redux-beacon/targets/google-analytics';

const exception = makeException((action, prevState, nextState) => {
  return {
    exDescription: /* (optional) */,
    exFatal: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

Don't need an `exDescription` or `exFatal`?

```js
import { makeException } from 'redux-beacon/targets/google-analytics';
import { noop } from 'redux-beacon/utils/noop';

const exception = makeException(noop, /* (optional) tracker name */ );
```

<br>

#### ecommItem
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup)

```js
import { makeEcommItem } from 'redux-beacon/targets/google-analytics';

const ecommItem = makeEcommItem((action, prevState, nextState) => {
  return {
    id: /* fill me in */,
    name: /* fill me in */,
    sku: /* (optional) */,
    category: /* (optional) */,
    price: /* (optional) */,
    quantity: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### ecommTransaction
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup)

```js
import { makeEcommTransaction } from 'redux-beacon/targets/google-analytics';

const ecommTransaction = makeEcommTransaction((action, prevState, nextState) => {
  return {
    id: /* fill me in */,
    affiliation: /* (optional) */,
    revenue: /* (optional) */,
    shipping: /* (optional) */,
    tax: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### ecommSend
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup) or
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

```js
import { makeEcommSend } from 'redux-beacon/targets/google-analytics';

const ecommSend = makeEcommSend(/* (optional) tracker name */);
```

<br>

#### ecommClear
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
##### Requires:
[Ecommerce Plugin Setup](#ecommerce-plugin-setup) or
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

```js
import { makeEcommClear } from 'redux-beacon/targets/google-analytics';

const ecommClear = makeEcommClear(/* (optional) tracker name */);
```

<br>

#### ecommImpression
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

```js
import { makeEcommImpression } from 'redux-beacon/targets/google-analytics';

const ecommImpression = makeEcommImpression((action, prevState, nextState) => {
  return {
    id: /* fill me in */,
    name: /* fill me in */,
    list: /* (optional) */,
    brand: /* (optional) */,
    category: /* (optional) */,
    variant: /* (optional) */,
    position: /* (optional) */,
    price: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### ecommProduct
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

```js
import { makeEcommProduct } from 'redux-beacon/targets/google-analytics';

const ecommProduct = makeEcommProduct((action, prevState, nextState) => {
  return {
    id: /* fill me in */,
    name: /* fill me in */,
    brand: /* (optional) */,
    category: /* (optional) */,
    variant: /* (optional) */,
    price: /* (optional) */,
    quantity: /* (optional) */,
    coupon: /* (optional) */,
    position: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### ecommPromotion
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

```js
import { makeEcommPromotion } from 'redux-beacon/targets/google-analytics';

const ecommPromotion = makeEcommPromotion((action, prevState, nextState) => {
  return {
    id: /* fill me in */,
    name: /* fill me in */,
    creative: /* (optional) */,
    position: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```

<br>

#### ecommAction
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce
##### Requires:
[Enhanced Ecommerce Plugin Setup](#enhanced-ecommerce-plugin-setup)

```js
import { makeEcommAction } from 'redux-beacon/targets/google-analytics';

const ecommAction = makeEcommAction((action, prevState, nextState) => {
  return {
    id: /* fill me in */,
    affiliation: /* (optional) */,
    revenue: /* (optional) */,
    tax: /* (optional) */,
    shipping: /* (optional) */,
    coupon: /* (optional) */,
    list: /* (optional) */,
    step: /* (optional) */,
    option: /* (optional) */,
  };
}, /* (optional) tracker name */ );
```
