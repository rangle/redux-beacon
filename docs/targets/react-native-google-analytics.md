# React Native Google Analytics

### Usage Instructions

1. Sign up for Google Analytics if you haven't already, and
   [create a new mobile property](https://support.google.com/analytics/answer/2587086#GA). Make
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
   import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
   import { GoogleAnalytics } from 'redux-beacon/targets/react-native';

   const target = GoogleAnalytics('UA-12345678-1', GoogleAnalyticsTracker);
   const analyticsMiddleware = createMiddleware(eventsMap, target);
   ```



### Example
  * [Redux Beacon: React Native Google Analytics Example](https://github.com/johannalee/react-native-redux-example)
