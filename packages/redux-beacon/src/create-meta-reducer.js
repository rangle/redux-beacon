import createEvents from './create-events';
import registerEvents from './register-events';
import getEventsWithMatchingKey from './get-events-with-matching-key';

function createMetaReducer(eventsMap, target, extensions = {}) {
  /* Why not arrow functions? AOT... */
  /* eslint-disable func-names */
  return function(reducer) {
    return function(prevState, action) {
      const nextState = reducer(prevState, action);
      const events = createEvents(
        getEventsWithMatchingKey(eventsMap, action.type),
        prevState,
        action,
        nextState,
      );

      registerEvents(events, target, extensions, prevState, action, nextState);

      return nextState;
    };
  };
}

export default createMetaReducer;
