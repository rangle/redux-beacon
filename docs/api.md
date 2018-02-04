# API Reference

 * [`Middleware API`](#middleware-api)
    * [`createMiddleware`](#import--createmiddleware--from-redux-beacon)
    * [`createMetaReducer`](#import--createmetareducer--from-redux-beacon)
    * [`EventDefinition`](#eventdefinition)
    * [`EventsMap`](#eventsmap)
 * [`Extensions`](#extensions)
   * [`logger`](#import-logger-from-redux-beacon-extensions-logger)
   * [`OfflineWeb`](#import-offlineWeb-from-redux-beacon-extensions-offline-web)
   * [`OfflineReactNative`](#import-offlineReactNative-from-redux-beacon-extensions-offline-react-native)
 * [`Utils`](#utils)
   * [`debounceEvent`](#import-debounceevent-from-redux-beacon-utils)
   * [`ensure`](#import-ensure-from-redux-beacon-utils)


# Middleware API

----

### `import { createMiddleware } from 'redux-beacon'`

#### Syntax

```js
createMiddleware(eventsMap, target[, extensions]);
```

#### Parameters

 * `eventsMap`: [eventsMap](events-map.md)
 * `target`: [target](../targets/index.md)
 * `extensions` *(optional)*: [extensions](../extensions/index.md).

#### Return value
 * [Redux middleware](http://redux.js.org/docs/advanced/Middleware.html#the-final-approach)

----

### `import { createMetaReducer } from 'redux-beacon'`

#### Syntax

```js
createMetaReducer(eventsMap, target[, extensions]);
```

#### Parameters

 * `eventsMap`: [eventsMap](events-map.md)
 * `target`: [target](../targets/index.md)
 * `extensions` *(optional)*: [extensions](../extensions/index.md).

#### Return value
 * [ngrx/store meta reducer](https://gist.github.com/btroncone/a6e4347326749f938510#implementing-a-meta-reducer)

----

### `EventDefinition`

A `function` that you provide to Redux Beacon for each Redux or ngrx/store action you want to track.

#### Syntax

```js
function eventDef(action, prevState, action) {
  // Return:
  //   - an event object, or
  //   - an array of event objects, or
  //   - a Promise that resolves to an event object, or
  //   - a Promise that resolves to an array of event objects
}
```

#### Parameters

 * Redux Beacon calls every event definition with three arguments:
   * `action`: The action object.
   * `prevState`: The state before the action.
   * `nextState`: The state after the action.

#### Typescript Type

```ts
import { EventDefinition } from 'redux-beacon';
```

----

### `EventsMap`

An `Object` you provide to Redux Beacon to map action types
to [eventDefinitions](./event-definition.md).

### Syntax

```js
import {
  someEventDefinition,
  someOtherEventDefinition,
  anotherEventDefinition,
} from './event-definitions';

const eventsMap = {
  'SOME_ACTION_TYPE': someEventDefinition,
  'SOME_OTHER_ACTION_TYPE': someOtherEventDefinition,
  'ANOTHER_ACTION_TYPE': anotherEventDefinition,
};
```

### Rules
 - Each key in the eventsMap must correspond to an action type.
 - Each property in the eventsMap must be a valid
   [eventDefinition](./event-definition.md).

### Typescript Type

```ts
import { EventsMap } from 'redux-beacon';
```
