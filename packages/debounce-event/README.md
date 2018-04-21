# @redux-beacon/debounce-event

Use with [Redux Beacon](https://www.npmjs.com/package/redux-beacon) to limit the frequency of analytics events.

### Example

```js
import debounceEvent from 'redux-beacon/utils/debounce-event';

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
