## `ensure()`

Returns a new event definition whose events will first go through the validator
before being passed to their target. Events that don't pass the validator won't
reach their targets.

### Import

```js
import ensure from '@redux-beacon/ensure';
```

### Syntax

```js
ensure(validator, eventDef)
```

#### Parameters

* `validator`: [`Validator`](#validator)
 - The function used to validate the event.
* `eventDef`: [`EventDefinition`](../api/event-definition.md)
  - The event you want to validate.

#### Validator

```typescript
type Validator = (event: any[]) => boolean;
```
 - Accepts an event or array of events as its sole argument.
 - Returns `true` if the event is valid.
 - Returns `false ` if the event is not valid.

### Example

```js
import joi from 'joi';
import ensure from '@redux-beacon/ensure'

const pageview = (action, prevState) => ({
  hitType: 'pageview',
  route: action.payload.location.pathname,
  referrer: prevState.currentRoute,
});

// Returns true if the event matches the schema
const isValidPageView = event =>
  !joi.validate(event, joi.object().keys({
    hitType: joi.string().only('pageview').required(),
    page: joi.string().disallow('/404'),
    title: joi.string(),
    location: joi.string(),
  })).error;

const eventsMap = {
  LOCATION_CHANGE: ensure(isValidPageView, pageview)
};
```

### Note

The ensure event does not currently support asynchronous events (see [comment](https://github.com/rangle/redux-beacon/issues/286#issuecomment-423023024)).

This means that it is not possible to use `ensure` with [`debounceEvent`](./debounce-event.md) for the same [`EventDefinition`](../api/event-definition.md) (or the other way around).
