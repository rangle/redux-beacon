const createEvents = require('./create-events');
const registerEvents = require('./register-events');

function createMetaReducer(eventDefinitionsMap, target, extensions = {}) {
  /* Why not arrow functions? AOT... */
  /* eslint-disable func-names */
  return function (reducer) {
    return function (prevState, action) {
      if (!eventDefinitionsMap[action.type]) {
        return reducer(prevState, action);
      }

      const nextState = reducer(prevState, action);
      const events = createEvents(
        eventDefinitionsMap[action.type],
        prevState,
        action,
        nextState
      );

      registerEvents(events, target, extensions, prevState, action);

      return nextState;
    };
  };
}

module.exports = createMetaReducer;
