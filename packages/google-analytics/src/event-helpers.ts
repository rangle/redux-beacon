import { EventDefinition } from 'redux-beacon';

export const trackPageView = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    page: string;
    title?: string;
    location?: string;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackEvent = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    category: string;
    action: string;
    label?: string;
    value?: number;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackTiming = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    category: string;
    var: string;
    value: number;
    label?: string;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackSocialInteraction = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    network: string;
    action: string;
    target: string;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackException = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{ exDescription?: string; exFatal?: boolean }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { exDescription, exFatal } = event;

  return {
    hitType: 'exception',
    customTrackerId: tracker,
    exDescription,
    exFatal,
  };
};

export const trackEcommItem = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    id: string;
    name: string;
    sku?: string;
    category?: string;
    price?: string;
    quantity?: number;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackEcommTransaction = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    id: string;
    affiliation?: string;
    revenue?: string;
    shipping?: string;
    tax?: string;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const ecommSend = (tracker?: string[] | string) => ({
  hitType: 'ecommSend',
  customTrackerId: tracker,
});

export const ecommClear = (tracker?: string[] | string) => ({
  hitType: 'ecommClear',
  customTrackerId: tracker,
});

export const trackEcommImpression = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    id?: string;
    name?: string;
    list?: string;
    brand?: string;
    category?: string;
    variant?: string;
    position?: number;
    price?: string;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackEcommProduct = <A = { [key: string]: any }, S = any>(
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
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackEcommPromotion = <A = { [key: string]: any }, S = any>(
  eventDef: EventDefinition<{
    id?: string;
    name?: string;
    creative?: string;
    position?: string;
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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

export const trackEcommAction = <A = { [key: string]: any }, S = any>(
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
  }, A, S>,
  tracker?: string[] | string
): EventDefinition<any, A, S> => (action, prevState, nextState) => {
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
