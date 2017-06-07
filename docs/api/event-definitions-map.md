### `EventDefinitionsMap`
`Object` used by Redux Beacon to map action types to [eventDefinitions](./event-definition.md).

```js
import {
someEventDefinition,
someOtherEventDefinition,
anotherEventDefinition,
} from './event-definitions';

const eventDefinitionsMap = {
  'SOME_ACTION_TYPE': someEventDefinition,
};
```

#### Rules
 - Each key in the eventDefinitionsMap must correspond to an action type.
 - Each property in the eventDefinitionsMap must be a valid
   [eventDefinition](./event-definition.md).
