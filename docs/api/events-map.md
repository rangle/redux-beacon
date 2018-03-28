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

## `EventsFunction`

A `Function` you provide to Redux Beacon to map actions
to Arrays of [eventDefinitions](./event-definition.md).

### Syntax

```js
import {
  eventForActionA,
  eventForActionB,
  eventForAllActions,
} from './event-definitions';

const eventsFunction = (action) => {
  switch(action.type){
    case 'ACTION_A': 
      return [eventForActionA];
    case 'ACTION_B': 
      return [eventForActionB];
    default:
      return [];
  };
}
```

### Rules
 - Each element in the returned array must be a valid
   [eventDefinition](./event-definition.md).

### Typescript Type

```ts
import { EventsFunction } from 'redux-beacon';
```

### Usage
 * [Getting Started](../getting-started-redux-users.md)
 * [Examples & Recipes](../recipes/index.md)
