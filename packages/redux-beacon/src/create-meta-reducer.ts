import createEvents from './create-events';
import getEventsWithMatchingKey from './get-events-with-matching-key';
import registerEvents from './register-events';
import { EventsMap, Extensions, Target } from './types';

/**
 * Create a meta reducer that synchronizes actions to analytics events.
 */
function createMetaReducer(
  eventsMap: EventsMap,
  target: Target,
  extensions: Extensions = {}
) {
  /* Why not arrow functions? AOT... */
  /* tslint:disable: only-arrow-functions */
  return function(reducer) {
    return function(prevState, action) {
      const nextState = reducer(prevState, action);
      const events = createEvents(
        getEventsWithMatchingKey(eventsMap, action.type),
        prevState,
        action,
        nextState
      );

      registerEvents(events, target, extensions, prevState, action, nextState);

      return nextState;
    };
  };
}

export default createMetaReducer;
