# React Native Segment

* [Setup](#setup)
* [Usage](#usage)
* [Event Definitions](#event-definitions)

----

### Setup

1. [Sign up](https://segment.com/signup) for Segment.io and create a Segment.io project for your mobile application.

2. Add
   [React Native Segment](https://github.com/segmentio/analytics-react-native) by following the guide.

3. Install the target:

    ```bash
    npm install --save @redux-beacon/react-native-segment
    ```

### Usage

```js
import Segment from '@redux-beacon/react-native-segment';
import SegmentAnalytics from '@segment/analytics-react-native';

// Create or import an events map.
// See "getting started" pages for instructions.

SegmentAnalytics.setup(writeKey, options);
const Analytics = SegmentAnalytics;

const segment = Segment();
const segmentMiddleware = createMiddleware(eventsMap, segment);
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
https://segment.com/docs/sources/mobile/react-native/#screen

```js
import { trackPageView } from '@redux-beacon/segment';

const pageView = trackPageView((action, prevState, nextState) => {
  return {
    name: /* (optional) */
    properties: /* (optional) */
  };
});
```



#### event
##### Docs:
https://segment.com/docs/sources/mobile/react-native/#track

```js
import { trackEvent } from '@redux-beacon/react-native-segment';

const event = trackEvent((action, prevState, nextState) => {
  return {
    name: /* fill me in */,
    properties: /* (optional) */,
  };
});
```



#### alias
##### Docs:
https://segment.com/docs/sources/mobile/react-native/#alias

```js
import { setAlias } from '@redux-beacon/react-native-segment';

const alias = setAlias((action, prevState, nextState) => {
  return {
    userId: /* fill me in */,
  };
});
```



#### group
##### Docs:
https://segment.com/docs/sources/mobile/react-native/#group

```js
import { setGroup } from '@redux-beacon/react-native-segment';

const group = setGroup((action, prevState, nextState) => {
  return {
    groupId: /* fill me in */,
    traits: /* (optional) */,
  };
});
```



#### identify
##### Docs:
https://segment.com/docs/sources/mobile/react-native/#identify

```js
import { identifyUser } from '@redux-beacon/react-native-segment';

const user = identifyUser((action, prevState, nextState) => {
  return {
    userId: /* fill me in */,
    traits: /* (optional) */,
  };
});
```



#### reset
##### Docs:
https://segment.com/docs/sources/mobile/react-native/#reset

```js
import { reset } from '@redux-beacon/react-native-segment';

const resetRequest = reset();
```
