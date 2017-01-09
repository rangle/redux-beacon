const createEvents = require('./create-events');
const registerEvents = require('./register-events');

function createMetaReducer(eventDefinitionsMap, target, extensions = {}) {
  /* eslint-disable func-names */
  return function (reducer) {
    return function (prevState, action) {
      if (!eventDefinitionsMap[action.type]) {
        return reducer(prevState, action);
      }

      const events = createEvents(eventDefinitionsMap[action.type], prevState, action);
      registerEvents(events, target, extensions, prevState, action);

      return reducer(prevState, action);
    };
  };
}

module.exports = createMetaReducer;
