import { EventDefinition } from 'redux-beacon';

export const trackPageView = (
  eventDef: EventDefinition<{
    page: string;
    title?: string;
    location?: string;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { page, title, location } = event;

  return {
    hitType: 'pageview',
    customTrackerId: tracker,
    page,
    title,
    location,
  };
};

export const trackEvent = (
  eventDef: EventDefinition<{
    category: string;
    action: string;
    label?: string;
    value?: number;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { category, label, value } = event;

  return {
    hitType: 'event',
    customTrackerId: tracker,
    eventCategory: category,
    eventAction: event.action,
    eventLabel: label,
    eventValue: value,
  };
};

export const trackTiming = (
  eventDef: EventDefinition<{
    category: string;
    var: string;
    value: number;
    label?: string;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { category, value, label } = event;

  return {
    hitType: 'timing',
    customTrackerId: tracker,
    timingCategory: category,
    timingVar: event.var,
    timingValue: value,
    timingLabel: label,
  };
};

export const trackSocialInteraction = (
  eventDef: EventDefinition<{
    network: string;
    action: string;
    target: string;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { network, target } = event;

  return {
    hitType: 'social',
    customTrackerId: tracker,
    network,
    action: event.action,
    target,
  };
};

export const trackException = (
  eventDef: EventDefinition<{ description?: string; isFatal?: boolean }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { description, isFatal } = event;

  return {
    hitType: 'exception',
    customTrackerId: tracker,
    description,
    isFatal,
  };
};

export const trackEcommItem = (
  eventDef: EventDefinition<{
    id: string;
    name: string;
    sku?: string;
    category?: string;
    price?: string;
    quantity?: number;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
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

export const trackEcommTransaction = (
  eventDef: EventDefinition<{
    id: string;
    affiliation?: string;
    revenue?: string;
    shipping?: string;
    tax?: string;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
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

export const ecommSend = (tracker?: string) => ({
  hitType: 'ecommSend',
  customTrackerId: tracker,
});

export const ecommClear = (tracker?: string) => ({
  hitType: 'ecommClear',
  customTrackerId: tracker,
});

export const trackEcommImpression = (
  eventDef: EventDefinition<{
    id?: string;
    name?: string;
    list?: string;
    brand?: string;
    category?: string;
    variant?: string;
    position?: number;
    price?: string;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { id, name, list, brand, category, variant, position, price } = event;

  if (!id && !name) {
    throw new Error(
      'You must provide an "id" or "name" to track impression data.'
    );
  }

  return {
    ecommType: 'enhanced',
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

export const trackEcommProduct = (
  eventDef: EventDefinition<{
    id?: string;
    name?: string;
    brand?: string;
    category?: string;
    variant?: string;
    price?: string;
    quantity?: number;
    coupon?: string;
    position?: number;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
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

  if (!id && !name) {
    throw new Error(
      'You must provide an "id" or "name" to track product data.'
    );
  }
  return {
    ecommType: 'enhanced',
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

export const trackEcommPromotion = (
  eventDef: EventDefinition<{
    id?: string;
    name?: string;
    creative?: string;
    position?: string;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { id, name, creative, position } = event;

  if (!id && !name) {
    throw new Error(
      'You must provide an "id" or "name" to track promotion data.'
    );
  }
  return {
    ecommType: 'enhanced',
    hitType: 'addPromo',
    customTrackerId: tracker,
    id,
    name,
    creative,
    position,
  };
};

export const trackEcommAction = (
  eventDef: EventDefinition<{
    actionName: string;
    id?: string;
    affiliation?: string;
    revenue?: string;
    tax?: string;
    shipping?: string;
    coupon?: string;
    list?: string;
    step?: number;
    option?: string;
  }>,
  tracker?: string
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const {
    actionName,
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

  if ((actionName === 'purchase' || actionName === 'refund') && !id) {
    throw new Error(
      'You must provide an "id" when tracking a "purchase" or "refund".'
    );
  }

  return {
    ecommType: 'enhanced',
    hitType: 'addAction',
    customTrackerId: tracker,
    actionName,
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
