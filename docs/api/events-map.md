## `EventsMap`

An `Object` you provide to Redux Beacon to map action types
to [eventDefinitions](./event-definition.md).

### Syntax

```js
import {
  eventForActionA,
  eventForActionB,
  eventForAllActions,
} from './event-definitions';

const eventsMap = {
  'ACTION_A': eventForActionA,
  'ACTION_B': eventForActionB,
  '*': eventForAllActions,
};
```

### Rules
 - Each key in the eventsMap must correspond to an action type.
 - Each property in the eventsMap must be a valid
   [eventDefinition](./event-definition.md).
 - The `"*"` key is special and can be used to match any action type.

### Typescript Type

```ts
import { EventsMap } from 'redux-beacon';
```

### Usage
 * [Getting Started](../getting-started-redux-users.md)
 * [Examples & Recipes](../recipes/index.md)
