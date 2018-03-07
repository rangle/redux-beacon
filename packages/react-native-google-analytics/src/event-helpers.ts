import { EventDefinition } from 'redux-beacon';

export const trackScreenView = (
  eventDef: EventDefinition<{
    screenName: string;
    customDimensions?: object;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
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

export const trackEvent = (
  eventDef: EventDefinition<{
    action: string;
    category: string;
    label?: string;
    value?: number;
    customDimensions?: object;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
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

export const trackPurchase = (
  eventDef: EventDefinition<{
    product: {
      id: string;
      name: string;
      category?: string;
      brand?: string;
      variant?: string;
      price?: number;
      quantity?: number;
      couponCode?: string;
    };
    transaction: {
      id: string;
      affiliation?: string;
      revenue?: number;
      tax?: number;
      shipping?: number;
    };
    action: string;
    category: string;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { product, transaction, category } = event;

  return {
    hitType: 'purchase',
    eventAction: event.action,
    product,
    transaction,
    eventCategory: category,
  };
};

export const trackTiming = (
  eventDef: EventDefinition<{
    category: string;
    value: number;
    name?: string;
    label?: string;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { category, value, label, name } = event;

  return {
    hitType: 'timing',
    timingCategory: category,
    timingValue: value,
    timingVar: name,
    timingLabel: label,
  };
};

export const trackSocialInteraction = (
  eventDef: EventDefinition<{
    network: string;
    action: string;
    target?: string;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'social',
    socialNetwork: network,
    socialAction: event.action,
    socialTarget: target,
  };
};

export const setUser = (eventDef: EventDefinition<string>): EventDefinition => (
  action,
  prevState,
  nextState
) => {
  const userId = eventDef(action, prevState, nextState);

  return {
    hitType: 'user',
    userId,
  };
};

export const setClient = (
  eventDef: EventDefinition<string>
): EventDefinition => (action, prevState, nextState) => {
  const clientId = eventDef(action, prevState, nextState);

  return {
    hitType: 'client',
    clientId,
  };
};

export const trackException = (
  eventDef: EventDefinition<{
    description: string;
    isFatal?: boolean;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { description, isFatal } = event;

  return {
    hitType: 'exception',
    exDescription: description,
    exFatal: isFatal,
  };
};
