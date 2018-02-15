export const trackScreenView = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { screenName, customDimensions } = event;

  const shouldSendCustomDimensionsEvent = Boolean(customDimensions);

  if (!shouldSendCustomDimensionsEvent) {
    return {
      hitType: 'pageview',
      page: screenName,
    };
  }

  return {
    hitType: 'pageviewCustomDimensions',
    page: screenName,
    customDimensionDict: customDimensions,
  };
};

export const trackEvent = eventDefinition => (action, prevState, nextState) => {
  const event = eventDefinition(action, prevState, nextState);
  const { category, label, value, customDimensions } = event;

  const shouldSendCustomDimensionsEvent = Boolean(customDimensions);

  if (!shouldSendCustomDimensionsEvent) {
    return {
      hitType: 'event',
      eventCategory: category,
      eventAction: event.action,
      eventLabel: label,
      eventValue: value,
    };
  }

  return {
    hitType: 'eventCustomDimensions',
    eventCategory: category,
    eventAction: event.action,
    eventLabel: label,
    eventValue: value,
    customDimensionDict: customDimensions,
  };
};

export const trackPurchase = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { product, transaction, category } = event;

  return {
    hitType: 'purchase',
    eventAction: event.action,
    product,
    transaction,
    eventCategory: category,
  };
};

export const trackTiming = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { category, value, label, name } = event;

  return {
    hitType: 'timing',
    timingCategory: category,
    timingValue: value,
    timingVar: name,
    timingLabel: label,
  };
};

export const trackSocialInteraction = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'social',
    socialNetwork: network,
    socialAction: event.action,
    socialTarget: target,
  };
};

export const setUser = eventDefinition => (action, prevState, nextState) => {
  const userId = eventDefinition(action, prevState, nextState);

  return {
    hitType: 'user',
    userId,
  };
};

export const setClient = eventDefinition => (action, prevState, nextState) => {
  const clientId = eventDefinition(action, prevState, nextState);

  return {
    hitType: 'client',
    clientId,
  };
};

export const trackException = eventDefinition => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { description, isFatal } = event;

  return {
    hitType: 'exception',
    exDescription: description,
    exFatal: isFatal,
  };
};
