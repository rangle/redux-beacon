const createEvents = (eventDefinition, prevState, action, nextState) => {
  if (eventDefinition === undefined) {
    return [];
  }
  return []
    .concat(eventDefinition(action, prevState, nextState))
    .filter(ifTruethy => ifTruethy);
};

export default createEvents;
