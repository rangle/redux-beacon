import * as flatten from 'array-flatten';

import createEvents from './create-events';
import getEventsWithMatchingKey from './get-events-with-matching-key';
import registerEvents from './register-events';
import {
  EventDefinition,
  EventsMap,
  EventsMapper,
  Extensions,
  Target,
} from './types';

/**
 * Create a meta reducer that synchronizes actions to analytics events.
 */
function createMetaReducer(
  eventsMap: EventsMap | EventsMapper,
  target: Target,
  extensions: Extensions = {}
) {
  const getEvents =
    typeof eventsMap === 'function'
      ? action => flatten<EventDefinition>([eventsMap(action)])
      : action => getEventsWithMatchingKey(eventsMap, action.type);

  /* Why not arrow functions? AOT... */
  /* tslint:disable: only-arrow-functions */
  return function(reducer) {
    return function(prevState, action) {
      const nextState = reducer(prevState, action);

      const events = createEvents(
        getEvents(action),
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
