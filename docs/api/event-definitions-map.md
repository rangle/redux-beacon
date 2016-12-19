### `EventDefinitionsMap`
`Object` used by ReduxGTM to map action types to [eventDefinitions](./event-definition.md).

```js
import {
someEventDefinition,
someOtherEventDefinition,
anotherEventDefinition,
} from './event-definitions';

const eventDefinitionsMap = {
  'SOME_ACTION_TYPE': someEventDefinition,
  'SOME_OTHER_ACTION_TYPE': [someOtherEventDefinition, anotherEventDefinition],
};
```
#### Notes
 - Each key in the eventDefinitionsMap must correspond to an action type.
 - Each property in the eventDefinitionsMap must be a valid
   [eventDefinition](./event-definition.md).
 - You can provide an array of event definitions if you want to emit
   multiple events for a single action.
