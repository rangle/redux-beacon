### `ensure(validator, eventDef)`

Returns a new event definition whose events will first go through the validator
before being passed to their target. Events that don't pass the validator won't
reach their targets.

#### Parameters
 * `function` validator(event)
   * accepts an event as its sole argument.
   * should return true if the event is valid, false otherwise.
 * `function` [eventDef](../api/event-definition.md)

#### Example

```js
import joi from 'joi';
import { ensure } from 'redux-beacon/utils';

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
