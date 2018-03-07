import createEvents from './create-events';
import registerEvents from './register-events';
import getEventsWithMatchingKey from './get-events-with-matching-key';
import { EventsMap, Extensions, Target } from './types';

/**
 * Create Redux middleware that synchronizes actions to analytics events.
 */
function createMiddleware(
  eventsMap: EventsMap,
  target: Target,
  extensions: Extensions = {}
) {
  return store => next => action => {
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    const events = createEvents(
      getEventsWithMatchingKey(eventsMap, action.type),
      prevState,
      action,
      nextState
    );

    registerEvents(events, target, extensions, prevState, action, nextState);

    return result;
  };
}

export default createMiddleware;
