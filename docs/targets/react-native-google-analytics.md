# React Native Google Analytics

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

### Setup

1. Sign up for Google Analytics and
   [create a new mobile property](https://support.google.com/analytics/answer/2587086#GA).

2. Install the following npm package: [GoogleAnalyticsBridge](https://www.npmjs.com/package/react-native-google-analytics-bridge).

3. For each mobile platform (Android or iOS), you need to follow
   its corresponding [manual installation](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Manual-installation).

### Usage

```js
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import { GoogleAnalytics } from 'redux-beacon/targets/rn/google-analytics';

// Create or import an events map.
// See "getting started" pages for instructions.

const trackingId = 'UA-12345678-1' // replace with your own
const ga = GoogleAnalytics(trackingId, GoogleAnalyticsTracker);

const gaMiddleware = createMiddleware(eventsMap, ga);
```

### Event Definitions

* [`screenView`](#screenview)
* [`event`](#event)
* [`purchase`](#purchase)
* [`timing`](#timing)
* [`socialInteraction`](#socialinteraction)
* [`user`](#user)
* [`client`](#client)
* [`exception`](#exception)


#### screenView
##### Docs:
 * https://developers.google.com/analytics/devguides/collection/ios/v3/screens
 * https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets

```js
import { trackScreenView } from 'redux-beacon/targets/rn/google-analtyics';

const screenView = trackScreenView((action, prevState, nextState) => {
  return {
    screenName: /* fill me in */,
    customDimensions: { /* (optional) */
      [/* dimension index */]: /* dimension value */,
    },
  };
});
```
<br>

#### event
##### Docs:
 * https://developers.google.com/analytics/devguides/collection/ios/v3/events
 * https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets

```js
import { trackEvent } from 'redux-beacon/targets/rn/google-analytics';

const someEvent = trackEvent((action, prevState, nextState) => {
  return {
    action: /* fill me in */,
    category: /* fill me in */,
    label: /* (optional) */,
    value: /* (optional) */,
    customDimensions: { /* (optional) */
      [/* dimension index */]: /* dimension value */
    },
  };
});
```

<br>

#### purchase
##### Docs:
 * https://developers.google.com/analytics/devguides/collection/ios/v3/ecommerce

```js
import { trackPurchase } from 'redux-beacon/targets/rn/google-analytics';

const somePurchaseEvent = trackPurchase((action, prevState, nextState) => {
  return {
    product: { /* fill me in */
      id: /* fill me in */,
      name: /* fill me in */,
      category: /* (optional) */,
      brand: /* (optional) */,
      variant: /* (optional) */,
      price: /* (optional) */,
      quantity: /* (optional) */,
      couponCode: /* (optional) */,
    },
    transaction: { /* fill me in */
      id: /* fill me in */,
      affiliation: /* (optional) */,
      revenue: /* (optional) */,
      tax: /* (optional) */,
      shipping: /* (optional) */,
      couponCode: /* (optional) */,
    },
    action: /* fill me in */,
    category: /* fill me in */,
  };
});
```

<br>

#### timing
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/usertimings

```js
import { trackTiming } from 'redux-beacon/targets/rn/google-analtyics';

const timingEvent = trackTiming((action, prevState, nextState) => {
  return {
    category: /* fill me in */,
    value: /* fill me in */,
    name: /* (optional) */,
    label: /* (optional) (requires name if provided)*/,
  };
});
```

<br>

#### socialInteraction
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/social

```js
import { trackSocialInteraction } from 'redux-beacon/targets/rn/google-analytics';

const socialInteraction = trackSocialInteraction((action, prevState, nextState) => {
  return {
    network: /* fill me in */,
    action: /* fill me in */,
    target: /* (optional) */,
  };
});
```

<br>

#### user
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/user-id

```js
import { setUser } from 'redux-beacon/targets/rn/google-analytics';

const user = setUser((action, prevState, nextState) => {
  const userId = /* fill me in */;
  return userId;
});
```

<br>

#### client
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId

```js
import { setClient } from 'redux-beacon/targets/rn/google-analytics';

const client = setClient((action, prevState, nextState) => {
  const clientId = /* fill me in */;
  return clientId;
});
```

<br>

#### exception
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/exceptions

```js
import { trackException } from 'redux-beacon/targets/rn/google-analytics';

const exception = trackException((action, prevState, nextState) => {
  return {
    description: /* fill me in */,
    isFatal: /* (optional) */,
  };
});
```
