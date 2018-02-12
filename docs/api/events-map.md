## `EventsMap`

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
