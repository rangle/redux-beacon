import { EventDefinition } from 'redux-beacon';
import { Traits } from './types';

export const trackPageView = (
  eventDef: EventDefinition<{
    category?: string;
    name?: string;
    properties?: any;
    options?: any;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const { category, name, properties, options } = eventDef(
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

export const trackEvent = (
  eventDef: EventDefinition<{ name: string; properties?: any; options?: any }>
): EventDefinition => (action, prevState, nextState) => {
  const { name, properties, options } = eventDef(action, prevState, nextState);

  return {
    hitType: 'event',
    eventAction: name,
    properties,
    options,
  };
};

export const setAlias = (
  eventDef: EventDefinition<{
    userId: string;
    previousId?: string;
    options?: any;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const { userId, previousId, options } = eventDef(
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

export const setGroup = (
  eventDef: EventDefinition<{ groupId: string; traits?: Traits; options?: any }>
): EventDefinition => (action, prevState, nextState) => {
  const { groupId, traits, options } = eventDef(action, prevState, nextState);

  return {
    hitType: 'group',
    groupId,
    traits,
    options,
  };
};

export const identifyUser = (
  eventDef: EventDefinition<{
    userId?: string;
    traits?: Traits;
    options?: any;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const { userId, traits, options } = eventDef(action, prevState, nextState);

  return {
    hitType: 'identify',
    userId,
    traits,
    options,
  };
};
