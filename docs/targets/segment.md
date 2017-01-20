# Segment.io

### Usage Instructions

1. [Sign up](https://segment.com/signup) for Segment.io if you haven't already, and create a Segment.io project for your web application!

2. Add the
   [JavaScript Tracking Snippet](https://segment.com/docs/sources/website/analytics.js/quickstart/)
   to your site.

    > **Tip:**
    > during development and testing it is often helpful to use the debug
    > version of analytics.js. Follow the instructions
    > [here](https://segment.com/docs/sources/website/analytics.js/#debug)
    > to enable it.

3. Import the target, then provide it when creating middleware or a meta reducer:

   ```js
   import { Segment } from 'redux-beacon/targets/segment';

   const middleware = createMiddleware(eventsMap, Segment);
   const metaReducer = createMetaReducer(eventsMap, Segment);
   ```



### For Typescript Users

This target also exposes interfaces for common Segment.io events:

```js
import {
  Event,
  PageView,
  Alias,
  Group,
  Identify
} from 'redux-beacon/targets/segment';
```

To use it, just specify the Segment.io event in your event definition:

```js
const pageView = {
  eventFields: (action): PageView => ({
    hitType: 'pageview',
    page: action.payload,
  }),
};
```
