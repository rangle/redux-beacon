### `EventDefinition`

`Object` used by Redux-Beacon to generate an event or an array of events
for a given action.

```js
const eventDefinition = {
  eventFields: (action, prevState) => ({
    hitType: action.type.toLowerCase(),
    route: action.payload.location.pathname,
  }),
  eventSchema: {
    hitType: value => value === 'location_change',
    route: value => ['/home', '/my-account'].includes(value),
  },
};
```
#### Properties

##### `function` eventFields(action, prevState)
Attach a function to this property to define any variables you would
like to emit with the event. Any function assigned to this property
will receive the state of the application (before the action), and the
associated action object. It could return a single event object or an
array of them.

##### `object` eventSchema *(optional)*
Use this property to define a schema for the event. Attach validation
functions for each property in the event that you want to validate. If
any of these validation functions return false, Redux-Beacon will not
pass those events to the target.
