# Segment

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

### Setup

1. [Sign up](https://segment.com/signup) for Segment.io and create a Segment.io project for your web application.

2. Add the
   [JavaScript Tracking Snippet](https://segment.com/docs/sources/website/analytics.js/quickstart/)
   to your site.

    {% hint style='info' %}
    During development and testing it is often helpful to use the debug
    version of analytics.js. Follow the instructions
    [here](https://segment.com/docs/sources/website/analytics.js/#debug)
    to enable it.
    {% endhint %}

3. Install the target:

    ```bash
    npm install --save @redux-beacon/segment
    ```

### Usage

```js
import Segment from '@redux-beacon/segment';

// Create or import an events map.
// See "getting started" pages for instructions.

const segment = Segment();

const segmentMiddleware = createMiddleware(eventsMap, segment);
const segmentMetaReducer = createMetaReducer(eventsMap, segment);
```

### Event Definitions

* [`pageView`](#pageview)
* [`event`](#event)
* [`alias`](#alias)
* [`group`](#group)
* [`identify`](#identify)

Don't see your event listed? Please submit a pull request to
the [Redux Beacon repository](https://github.com/rangle/redux-beacon) with the
missing event. Use the source of the existing `event-helpers` to guide your
work. If you need any support feel free to make the pull request with all you're
able to do. We can fill in the gaps from there.

#### pageView
##### Docs:
https://segment.com/docs/sources/website/analytics.js/#page

```js
import { trackPageView } from '@redux-beacon/segment';

const pageView = trackPageView((action, prevState, nextState) => {
  return {
    category: /* (optional) */
    name: /* (optional) */
    properties: /* (optional) */
    options: /* (optional) */
  };
});
```

{% hint style='danger' %}
The last line of the tracking snippet `analytics.page();` hits Segment.io
with a page view that matches the first loaded route. If you're tracking
page views using Redux Beacon, be sure to remove this line so the initial
page load isn't recorded twice.
{% endhint %}

#### event
##### Docs:
https://segment.com/docs/sources/website/analytics.js/#track

```js
import { trackEvent } from '@redux-beacon/segment';

const event = trackEvent((action, prevState, nextState) => {
  return {
    name: /* fill me in */,
    properties: /* (optional) */,
    options: /* (optional) */,
  };
});
```



#### alias
##### Docs:
https://segment.com/docs/sources/website/analytics.js/#alias

```js
import { setAlias } from '@redux-beacon/segment';

const alias = setAlias((action, prevState, nextState) => {
  return {
    userId: /* fill me in */,
    previousId: /* (optional) */,
    options: /* (optional) */,
  };
});
```



#### group
##### Docs:
https://segment.com/docs/sources/website/analytics.js/#group

```js
import { setGroup } from '@redux-beacon/segment';

const group = setGroup((action, prevState, nextState) => {
  return {
    groupId: /* fill me in */,
    traits: /* (optional) */,
    options: /* (optional) */,
  };
});
```



#### identify
##### Docs:
https://segment.com/docs/sources/website/analytics.js/#identify

```js
import { identifyUser } from '@redux-beacon/segment';

const user = identifyUser((action, prevState, nextState) => {
  return {
    userId: /* (optional) */,
    traits: /* (optional) */,
    options: /* (optional) */,
  };
});
```



#### reset
##### Docs:
https://segment.com/docs/sources/website/analytics.js/#reset-logout

```js
import { reset } from '@redux-beacon/segment';

reset(() => ({}));
```
