/* const pageView = trackPageView((action, prevState, nextState) => {
  return {
    page: /!* fill me in *!/,
    title: /!* (optional) *!/,
    location: /!* (optional) *!/,
  };
}, /!* (optional) tracker name *!/ ); */

export const trackPageView = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  return {
    hitType: 'pageview',
    customTrackerId: tracker,
    page: event.page,
    title: event.title,
    location: event.location,
  };
};

export const trackEvent = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { eventCategory, eventAction, eventLabel, eventValue } = event;

  return {
    hitType: 'event',
    customTrackerId: tracker,
    eventCategory,
    eventAction,
    eventLabel,
    eventValue,
  };
};

export const trackTiming = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { category, value, label } = event;

  return {
    hitType: 'timing',
    customTrackerId: tracker,
    category,
    var: event.var,
    value,
    label,
  };
};

export const trackSocialInteraction = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'socialInteraction',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const trackException = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { description, isFatal } = event;

  return {
    hitType: 'exception',
    customTrackerId: tracker,
    description,
    isFatal,
  };
};

/** */

export const trackEcommItem = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { id, name, sku, category, price, quantity } = event;

  return {
    hitType: 'addItem',
    customTrackerId: tracker,
    id,
    name,
    sku,
    category,
    price,
    quantity,
  };
};

export const trackEcommTransaction = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'addTransaction',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const ecommSend = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'ecommSend',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const ecommClear = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'ecommClear',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const trackEcommImpression = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'addImpression',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const trackEcommProduct = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'addProduct',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const trackEcommPromotion = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'addPromo',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const trackEcommAction = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'addAction',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};
