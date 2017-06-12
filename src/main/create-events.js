const createEvents = (eventDefinition, prevState, action) =>
  [].concat(eventDefinition(action, prevState)).filter(ifTruethy => ifTruethy);

module.exports = createEvents;
