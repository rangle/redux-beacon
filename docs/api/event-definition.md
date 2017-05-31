### `EventDefinition`

A `function` used by Redux Beacon to generate an event or series of events for a
given Redux action. An event definition receives the state of the application
(before the action), and the associated action object.

#### A Basic Event Definition
```js
function (action, prevState) {
  return {
    hitType: 'pageview',
    route: action.payload.location.pathname,
    referrer: prevState.currentRoute,
  };
}
```

#### Generate Multiple Events Per Action
You can return an array of event objects in an event definition.
```js
function (action, prevState) {
  return [
    {
      hitType: 'pageview',
      route: action.payload.location.pathname,
      referrer: prevState.currentRoute,
    },
    {
      hitType: 'event',
      eventCategory: 'redux',
      eventAction: action.type,
    },
  ];
}
```

#### Conditionally Create Events
If you don't want to generate an event each time an action fires you can return
a falsey value (e.g.`null`) instead of an event object and it won't be passed to
the target.

```js
function (action, prevState) {
  if (action.payload.location.route === '/404') {
    return null;
  }
  return {
    hitType: action.type.toLowerCase(),
    route: action.payload.location.pathname,
    referrer: prevState.currentRoute,
  }
};
```

You can also do this with multiple events.
```js
function (action, prevState) {
  const pageview = {
    hitType: 'pageview',
    route: action.payload.location.pathname,
    referrer: prevState.currentRoute,
  };
  const genericEvent = {
    hitType: 'event',
    eventCategory: 'redux',
    eventAction: action.type,
  };
  return [
    action.payload.location.route !== '/404' ? pageview : null,
    genericEvent,
  ];
}
```

#### Validate Events Using Higher-Order Functions
In previous versions, event definition's had an `eventSchema` property that was
used to validate each property in a generated event. If a generated event didn't
match the provided schema or shape then Redux Beacon wouldn't pass that event to
the target. Now, we recommed using typed interfaces (Flow/Typescript) or
higher-order functions to achieve the same result. Redux Beacon exposes a
utility function to make this easier: [`ensure`](../utils/ensure.md).
