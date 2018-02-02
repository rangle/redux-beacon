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

### Custom Dimensions

In order to leverage custom dimensions defined in GA, you can use the `eventCustomDimensions` and `pageviewCustomDimensions` hit types in your `eventsMap` definition. This could look like so:

  ```js
  // Define an event
  const pageView = action => ({
    hitType: 'pageviewCustomDimensions',
    page: action.payload,
    customDimensionDict: {
      '1': 'premium',
      '5': 'foo'
    }
  }),

  // Map the event to a Redux action
  const eventsMap = {
    LOCATION_CHANGE: pageView,
  };

  // Create the middleware
  const middleware = createMiddleware(eventsMap, GoogleAnalytics);
  ```
`pageviewCustomDimensions` - Tracks a screen view with one or more customDimensionValues. See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets) docs for more info.

`eventCustomDimensions` - Tracks an event with one or more customDimensionValues. See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets) docs for more info.

### User ID

In order to use the User ID Google Analytics feature, simply use the `user` hit type like so:

  ```js
  // Define an event
  const setUser = action => ({
    hitType: 'user',
    userId: action.user_id
  }),

  // Map the event to a Redux action
  const eventsMap = {
    USER_LOG_IN: setUser,
  };

  // Create the middleware
  const middleware = createMiddleware(eventsMap, GoogleAnalytics);
  ```

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/ios/v3/user-id) docs for more info.

### Client ID

In order to use the Client ID Google Analytics feature, simply use the `client` hit type like so:

  ```js
  // Define an event
  const setClient = action => ({
    hitType: 'client',
    clientId: action.client_id
  }),

  // Map the event to a Redux action
  const eventsMap = {
    CLIENT: setClient,
  };

  // Create the middleware
  const middleware = createMiddleware(eventsMap, GoogleAnalytics);
  ```

See the [Google Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId) docs for more info.

### Example
  * [Redux Beacon: React Native Google Analytics Example](https://github.com/johannalee/react-native-redux-example)
