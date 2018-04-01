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
 * Create Redux middleware that synchronizes actions to analytics events.
 */
function createMiddleware(
  eventsMap: EventsMap | EventsMapper,
  target: Target,
  extensions: Extensions = {}
) {
  const getEvents =
    typeof eventsMap === 'function'
      ? action => flatten<EventDefinition>([eventsMap(action)])
      : action => getEventsWithMatchingKey(eventsMap, action.type);

  return store => next => action => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    const events = createEvents(
      getEvents(action),
      prevState,
      action,
      nextState
    );

    registerEvents(events, target, extensions, prevState, action, nextState);

    return result;
  };
}

export default createMiddleware;
