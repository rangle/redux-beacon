import createEvents from './create-events';
import registerEvents from './register-events';

function createMetaReducer(eventDefinitionsMap, target, extensions = {}) {
  /* Why not arrow functions? AOT... */
  /* eslint-disable func-names */
  return function(reducer) {
    return function(prevState, action) {
      const nextState = reducer(prevState, action);
      const events = createEvents(
        eventDefinitionsMap[action.type],
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
