### `EventDefinition`

`Object` used by ReduxGTM to generate an event for a given action.

```js
const eventDefinition = {
  eventName: 'my-app-page-view',
  eventFields: (prevState, action) => ({
    route: action.payload.location.pathname,
  }),
  eventSchema: {
    event: value => typeof value === 'string',
    route: value => typeof value === 'string',
  },
};
```
#### Properties

##### `string` eventName *(optional)*
Use this property to specify the name of the event you want to emit
for the associated action. If not provided, the event name defaults to
the action type.

##### `function` eventFields(prevState, action) *(optional)*
Attach a function to this property to define any variables you would
like to emit with the event. Any function assigned to this property
will receive the state of the application (before the action), and the
associated action object. Any property named "event" in the returned
object will override any defaults or any event names defined in
`eventName`.

##### `object` eventSchema *(optional)*
Use this property to define a schema for the event. Attach validation
functions for each property in the event that you want to validate. If
any of these validation functions return false, ReduxGTM will not emit
the event.
