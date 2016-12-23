# Google Analytics

### Usage Instructions

1. Sign up for Google Analytics if you haven't already, and
   [create a new web property](https://support.google.com/analytics/answer/1008015?hl=en). Make
   a note of your property's
   [tracking Id](https://support.google.com/analytics/answer/1008080).

2. Add the
   [JavaScript Tracking Snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
   to your site.

3. Import the target, then provide it when creating the middleware:

   ```js
   import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';

   const analyticsMiddleware = createMiddleware(eventsMap, GoogleAnalytics);
   ```

### Example
  * [Redux Beacon: Google Analytics Example](https://github.com/rangle/redux-beacon/tree/master/examples/google-analytics)


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

Just specify the type when creating your event definition:

```js
const pageView = {
  eventFields: (action): PageView => ({
    hitType: 'pageview',
    page: action.payload,
  }),
};
```
