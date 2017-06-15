# Notes on Unit Testing

When your event definitions contain a lot of logic and data
transformations it's not a bad idea to test them. Or better yet to
start out with a test or two, and build out your event definitions to
make the tests pass.

To help with testing, Redux Beacon exposes a function `createEvents`
which it uses internally to create events from event
definitions. `createEvents` has the following signature:

```js
export function createEvents(
  eventDefinition: EventDefinition,
  prevState: any,
  action: any,
  nextState: any
): Array<any>;
```

> **Note:** `createEvents` always returns an array of events generated
> from the event defintion, even if it is just one event.
