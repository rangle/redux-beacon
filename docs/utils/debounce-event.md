## `debounceEvent()`

If you have an event definition tied to a Redux action that fires too
frequently, you can use this util to limit the frequency of analytics events
(e.g. form input).

### Import

```js
import debounceEvent from '@redux-beacon/debounce-event';
```

### Syntax

```js
debounceEvent(msDelay, eventDef)
```

#### Parameters

* `msDelay`: [`number`](https://developer.mozilla.org/en-US/docs/Glossary/Number)
  - The time in milliseconds that needs to elapse between event definition calls
    before the analytics event is dispatched to a target.
* `eventDef`: [`EventDefinition`](../api/event-definition.md)
  - The event you want to debounce.


### Example

```js
import debounceEvent from '@redux-beacon/debounce-event';

// A normal event definition
const searchTerm = (action) => ({
  hitType: 'event',
  eventCategory: 'books',
  eventAction: 'search',
  eventLabel: action.payload
});

const eventsMap = {
  // Assume that SEARCH_TERM_ENTERED fires whenever a user types a character into
  // an input field.
  SEARCH_TERM_ENTERED: debounceEvent(1000, searchTerm)
  // The analytics event will only fire after 1s since the last entered character
};

// provide the events map when creating your middleware or meta reducer...
```

### Note

The debounceEvent event does not currently support asynchronous events (see [comment](https://github.com/rangle/redux-beacon/issues/286#issuecomment-423023024)).

This means that it is not possible to use `debounceEvent` with [`ensure`](./ensure.md) for the same [`EventDefinition`](../api/event-definition.md) (or the other way around).
