# React Native Google Tag Manager

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

### Setup

1. Sign up for Google Tag Manager and
   [create a mobile container](https://support.google.com/tagmanager/answer/6103696?hl=en#MobileContainers). Select
   **Legacy** for SDK Version, and be sure to make a note of your property's
   [tracking Id](https://support.google.com/analytics/answer/1008080).

2. Install the following npm package,
   [GoogleAnalyticsBridge](https://www.npmjs.com/package/react-native-google-analytics-bridge).

3. For each mobile platform (Android or iOS), you need to follow
   its corresponding [manual installation](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Manual-installation)
   for GoogleAnalyticsBridge usage.

### Usage

   ```js
   import { Platform } from 'react-native';
   import { GoogleTagManager as GTMBridge } from 'react-native-google-analytics-bridge';
   import { GoogleTagManager } from 'redux-beacon/targets/react-native';

   // Create or import an events map.
   // See "getting started" pages for instructions.

   const containerId = (Platform.OS === 'ios') ? 'GTM-IOSXXXX' : 'GTM-ANDROID';

   const gtm = GoogleTagManager(containerId, GTMBridge);
   const gtmMiddleware = createMiddleware(eventsMap, gtm);
   ```

### Event Definitions

```js
const event = (action, prevState, nextState) => {
  return {
    event: /* fill me in */,
    /* add any additional key/value pairs below */,
  };
};
```
#### Notes

* If an event object doesn't have an `event` property, but
  has a `hitType` property, this target will create an `event`
  property and set it to the `hitType` string. For example:

  ```js
  // Given the following event definition
  const pageview = action => ({
    hitType: 'pageview',
    page: action.payload,
  });

  // Say the action is equal to
  // { type: LOCATION_CHANGE, payload: '/home' }
  // The following object will get pushed to the dataLayer
  const dataLayerEvent = {
    hitType: 'pageview',
    event: 'pageview', // this is done automatically
    page: '/home',
  };
  ```

> **[info] Tip**
> This gives you the option to use the event definitions
> exposed by the [Google Analytics target](./google-analytics.md#event-definitions)
