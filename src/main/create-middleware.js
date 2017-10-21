import createEvents from './create-events';
import registerEvents from './register-events';

function createMiddleware(eventDefinitionsMap, target, extensions = {}) {
  return store => next => action => {
    if (!eventDefinitionsMap[action.type]) {
      return next(action);
    }

    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();

    const events = createEvents(
      eventDefinitionsMap[action.type],
      prevState,
      action,
      nextState
    );

    registerEvents(events, target, extensions, prevState, action);

    return result;
  };
}

export default createMiddleware;
