const createEvents = (eventDefinition, prevState, action, nextState) =>
  []
    .concat(eventDefinition(action, prevState, nextState))
    .filter(ifTruethy => ifTruethy);

export default createEvents;
