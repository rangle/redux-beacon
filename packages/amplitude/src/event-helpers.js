export const logEvent = eventDefinition => (action, prevState, nextState) => {
  const { type, properties } = eventDefinition(action, prevState, nextState);
  return {
    hitType: 'logEvent',
    eventType: type,
    eventProperties: properties,
  };
};

export const setUserId = eventDefinition => (action, prevState, nextState) => {
  const userId = eventDefinition(action, prevState, nextState);

  return {
    hitType: 'setUserId',
    userId,
  };
};

export const logout = () => () => [
  {
    hitType: 'setUserId',
    userId: null,
  },
  {
    hitType: 'regenerateDevideId',
  },
];

export const setUserProperties = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const userProperties = eventDefinition(action, prevState, nextState);

  return {
    hitType: 'setUserProperties',
    userProperties,
  };
};
