### `EventDefinition`

A `function` used by Redux Beacon to generate an event or series of events for a
given Redux action. An event definition receives the associated action object
and the state of the application (before and after the action).

```typescript
export type EventDefinition = (
  action: Action,
  prevState: any,
  nextState: any
) => any | Array<any> | Promise<any>;
```

#### A Basic Event Definition
```js
function (action, prevState, nextState) {
  return {
    hitType: 'pageview',
    route: action.payload.location.pathname,
    referrer: prevState.currentRoute,
    numUserActions: nextState.numUserActions,
  };
}
```

#### Generate Multiple Events Per Action
You can return an array of event objects.
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

#### Create Asynchronous Events
You can return a promise that resolves to an event object or array of event
objects.
```js
function (action, prevState, nextState) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return {
        hitType: 'pageview',
        route: action.payload.location.pathname,
        referrer: prevState.currentRoute,
        numUserActions: nextState.numUserActions,
      };
    }, 2000);
  });
}
```
