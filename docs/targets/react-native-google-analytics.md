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

4. Install the target:

    ```bash
    npm install --save @redux-beacon/react-native-google-analytics
    ```

### Usage

```js
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import GoogleAnalytics from '@redux-beacon/react-native-google-analytics';

// Create or import an events map.
// See "getting started" pages for instructions.

const trackingId = 'UA-12345678-1' // replace with your own
const ga = GoogleAnalytics(trackingId, GoogleAnalyticsTracker);

const gaMiddleware = createMiddleware(eventsMap, ga);
```

#### Additional Settings

You also have access to some [additional settings](https://github.com/idehub/react-native-google-analytics-bridge#googleanalyticssettings-api) from the underlying `react-native-google-analytics-bridge`. These settings can be used to:

* Disable your app from sending events to Google Analytics
* Disable your app from tracking events altogether - this can be used to give your users control over opting in/out from analytics.

These settings can be applied as follows:

```js
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';
import GoogleAnalytics from '@redux-beacon/react-native-google-analytics';

const trackingId = 'UA-12345678-1' // replace with your own
const ga = GoogleAnalytics(trackingId, GoogleAnalyticsTracker);

GoogleAnalyticsSettings.setDryRun(true);
GoogleAnalyticsSettings.setOptOut(true);
```

### Event Definitions

* [`screenView`](#screenview)
* [`event`](#event)
* [`purchase`](#purchase)
* [`timing`](#timing)
* [`socialInteraction`](#socialinteraction)
* [`user`](#user)
* [`client`](#client)
* [`IDFA`](#idfa)
* [`exception`](#exception)

Don't see your event listed? Please submit a pull request to
the [Redux Beacon repository](https://github.com/rangle/redux-beacon) with the
missing event. Use the source of the existing `event-helpers` to guide your
work. If you need any support feel free to make the pull request with all you're
able to do. We can fill in the gaps from there.

#### screenView
##### Docs:
 * https://developers.google.com/analytics/devguides/collection/ios/v3/screens
 * https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets

```js
import { trackScreenView } from '@redux-beacon/react-native-google-analytics';

const screenView = trackScreenView((action, prevState, nextState) => {
  return {
    screenName: /* fill me in */,
    customDimensions: { /* (optional) */
      [/* dimension index */]: /* dimension value */,
    },
  };
});
```


#### event
##### Docs:
 * https://developers.google.com/analytics/devguides/collection/ios/v3/events
 * https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets

```js
import { trackEvent } from '@redux-beacon/react-native-google-analytics';

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



#### purchase
##### Docs:
 * https://developers.google.com/analytics/devguides/collection/ios/v3/ecommerce

```js
import { trackPurchase } from '@redux-beacon/react-native-google-analytics';

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



#### timing
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/usertimings

```js
import { trackTiming } from '@redux-beacon/react-native-google-analytics';

const timingEvent = trackTiming((action, prevState, nextState) => {
  return {
    category: /* fill me in */,
    value: /* fill me in */,
    name: /* (optional) */,
    label: /* (optional) (requires name if provided)*/,
  };
});
```



#### socialInteraction
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/social

```js
import { trackSocialInteraction } from '@redux-beacon/react-native-google-analytics';

const socialInteraction = trackSocialInteraction((action, prevState, nextState) => {
  return {
    network: /* fill me in */,
    action: /* fill me in */,
    target: /* (optional) */,
  };
});
```



#### user
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/user-id

```js
import { setUser } from '@redux-beacon/react-native-google-analytics';

const user = setUser((action, prevState, nextState) => {
  const userId = /* fill me in */;
  return userId;
});
```



#### client
##### Docs:
https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId

```js
import { setClient } from '@redux-beacon/react-native-google-analytics';

const client = setClient((action, prevState, nextState) => {
  const clientId = /* fill me in */;
  return clientId;
});
```



#### idfa
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/campaigns#ios-install

*Important:* For iOS you can only use this method if you have done the optional step 6 from the `react-native-google-analytics-bridge` installation guide](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Manual-installation). Only enable this (and link the appropriate libraries) if you plan to use advertising features or advertising click attribution in your app, else your app may get rejected from the App Store.

```js
import { allowIDFA } from '@redux-beacon/react-native-google-analytics';

const idfa = allowIDFA((action, prevState, nextState) => {
  const allowIDFA = /* fill me in */;
  return allowIDFA;
});
```



#### exception
##### Docs:
https://developers.google.com/analytics/devguides/collection/ios/v3/exceptions

```js
import { trackException } from '@redux-beacon/react-native-google-analytics';

const exception = trackException((action, prevState, nextState) => {
  return {
    description: /* fill me in */,
    isFatal: /* (optional) */,
  };
});
```
