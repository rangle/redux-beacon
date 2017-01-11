# React Native Google Tag Manager

### Usage Instructions

1. Sign up for Google Tag Manager if you haven't already,
   [create a mobile container](https://support.google.com/tagmanager/answer/6103696?hl=en#MobileContainers) for each of Android and iOS.
   Select **Legacy** for SDK Version. Make
   a note of your property's
   [tracking Id](https://support.google.com/analytics/answer/1008080).

2. Install the npm package,
   [GoogleAnalyticsBridge](https://www.npmjs.com/package/react-native-google-analytics-bridge),
   in your project.

3. For each mobile platform (Android or iOS), you need to follow
   its corresponding [manual installation](https://github.com/idehub/react-native-google-analytics-bridge/wiki/Manual-installation)
   for GoogleAnalyticsBridge usage.

4. Import the target, then provide it when creating the middleware:

   ```js
   import { Platform } from 'react-native';
   import { GoogleTagManager as GTMBridge } from 'react-native-google-analytics-bridge';
   import { GoogleTagManager } from 'redux-beacon/targets/react-native';

   const containerId = (Platform.OS === 'ios') ? 'GTM-IOSXXXX' : 'GTM-ANDROID';
   const target = GoogleTagManager(containerId, GTMBridge);
   const analyticsMiddleware = createMiddleware(eventsMap, target);
   ```

   You need to detect the current platform and give a correct container ID for Google Tag Manager.