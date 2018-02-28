export const trackPageView = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const { category, name, properties, options } = eventDefinition(
    action,
    prevState,
    nextState
  );

  return {
    hitType: 'pageview',
    page: category,
    name,
    properties,
    options,
  };
};

export const trackEvent = eventDefinition => (action, prevState, nextState) => {
  const { name, properties, options } = eventDefinition(
    action,
    prevState,
    nextState
  );

  return {
    hitType: 'event',
    eventAction: name,
    properties,
    options,
  };
};

export const setAlias = eventDefinition => (action, prevState, nextState) => {
  const { userId, previousId, options } = eventDefinition(
    action,
    prevState,
    nextState
  );

  return {
    hitType: 'alias',
    userId,
    previousId,
    options,
  };
};

export const setGroup = eventDefinition => (action, prevState, nextState) => {
  const { groupId, traits, options } = eventDefinition(
    action,
    prevState,
    nextState
  );

  return {
    hitType: 'group',
    groupId,
    traits,
    options,
  };
};

export const identifyUser = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const { userId, traits, options } = eventDefinition(
    action,
    prevState,
    nextState
  );

  return {
    hitType: 'identify',
    userId,
    traits,
    options,
  };
};
