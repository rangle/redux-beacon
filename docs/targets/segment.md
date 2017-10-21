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

    > **<span style="color: #b51c1c">Warning:</span>**
    > the last line of the tracking snippet `analytics.page();` hits Segment.io
    > with a page view that matches the first loaded route. If you're tracking
    > page views using Redux Beacon, be sure to remove this line so the initial
    > page load isn't recorded twice.

3. Import the target, then provide it when creating middleware or a meta reducer:

   ```js
   import { Segment } from 'redux-beacon/targets/segment';

   const middleware = createMiddleware(eventsMap, Segment());
   const metaReducer = createMetaReducer(eventsMap, Segment());
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
const pageView = (action): PageView => ({
  hitType: 'pageview',
  page: action.payload,
});
```
