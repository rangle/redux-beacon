export const trackPageView = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { page, title, location } = event;

  return {
    hitType: 'pageview',
    customTrackerId: tracker,
    page,
    title,
    location,
  };
};

export const trackEvent = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { category, label, value } = event;

  return {
    hitType: 'event',
    customTrackerId: tracker,
    category,
    action: event.action,
    label,
    value,
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
    hitType: 'social',
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
  const { id, affiliation, revenue, shipping, tax } = event;

  return {
    hitType: 'addTransaction',
    customTrackerId: tracker,
    id,
    affiliation,
    revenue,
    shipping,
    tax,
  };
};

export const ecommSend = tracker => ({
  hitType: 'ecommSend',
  customTrackerId: tracker,
});

export const ecommClear = tracker => ({
  hitType: 'ecommClear',
  customTrackerId: tracker,
});

export const trackEcommImpression = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { id, name, list, brand, category, variant, position, price } = event;

  return {
    hitType: 'addImpression',
    customTrackerId: tracker,
    id,
    name,
    list,
    brand,
    category,
    variant,
    position,
    price,
  };
};

export const trackEcommProduct = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const {
    id,
    name,
    brand,
    category,
    variant,
    price,
    quantity,
    coupon,
    position,
  } = event;

  return {
    hitType: 'addProduct',
    customTrackerId: tracker,
    id,
    name,
    brand,
    category,
    variant,
    price,
    quantity,
    coupon,
    position,
  };
};

export const trackEcommPromotion = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const { id, name, creative, position } = event;

  return {
    hitType: 'addPromo',
    customTrackerId: tracker,
    id,
    name,
    creative,
    position,
  };
};

export const trackEcommAction = (eventDefinition, tracker) => (
  action,
  prevState,
  nextState
) => {
  const event = eventDefinition(action, prevState, nextState);
  const {
    id,
    affiliation,
    revenue,
    tax,
    shipping,
    coupon,
    list,
    step,
    option,
  } = event;

  return {
    hitType: 'addAction',
    customTrackerId: tracker,
    id,
    affiliation,
    revenue,
    tax,
    shipping,
    coupon,
    list,
    step,
    option,
  };
};
