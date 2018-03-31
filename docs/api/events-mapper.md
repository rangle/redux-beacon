## `EventsMapper`

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
import { EventsMapper } from 'redux-beacon';
```

### Usage
 * [Getting Started](../getting-started-redux-users.md)
 * [Examples & Recipes](../recipes/index.md)
