## `combineEvents()`

Combine multiple event defintions into one. Use this if you want to dispatch
multiple analytics events for a single action.

### Import

```js
import combineEvents from '@redux-beacon/combine-events';
```

### Syntax

```js
combineEvents(eventDef1 [, eventDef2, ..., eventDef3])
```

#### Parameters

* `eventDef1 ... eventDefN`: [`EventDefinition`](../api/event-definition.md)
 - The events you want to combine together.

### Example

```js
import combineEvents from '@redux-beacon/combine-events';
import { trackTiming, trackEvent } from '@redux-beacon/google-analytics';
import { VIDEO_PLAYING_ACTION } from './my/redux/actions';

const videoPlayed = trackEvent(() => ({
  category: 'Videos',
  action: 'play',
  label: 'Fall Campaign'
}));

const videoLoaded = trackTiming(() => ({
  category: 'Videos',
  var: 'load',
  value: 3549,
}));

const eventsMap = {
  [VIDEO_PLAYING_ACTION]: combineEvents(
    videoPlayed,
    videoLoaded,
  ),
};
```
