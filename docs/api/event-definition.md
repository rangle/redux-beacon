## `EventDefinition`

A `function` that you provide to Redux Beacon for each Redux or ngrx/store action you want to track.

### Syntax

```js
function eventDef(action, prevState, nextState) {
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

### Typescript Type

```ts
import { EventDefinition } from 'redux-beacon';
```
