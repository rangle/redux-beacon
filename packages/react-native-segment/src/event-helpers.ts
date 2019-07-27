import { EventDefinition } from 'redux-beacon';

import { Traits } from './types';

export const trackPageView = (
  eventDef: EventDefinition<{
    name?: string;
    properties?: any;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const { name, properties } = eventDef(action, prevState, nextState);

  return {
    hitType: 'pageview',
    name,
    properties,
  };
};

export const trackEvent = (
  eventDef: EventDefinition<{ name: string; properties?: any }>
): EventDefinition => (action, prevState, nextState) => {
  const { name, properties } = eventDef(action, prevState, nextState);

  return {
    hitType: 'event',
    eventAction: name,
    properties,
  };
};

export const setAlias = (
  eventDef: EventDefinition<{
    userId: string;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const { userId } = eventDef(action, prevState, nextState);

  return {
    hitType: 'alias',
    userId,
  };
};

export const setGroup = (
  eventDef: EventDefinition<{ groupId: string; traits?: Traits }>
): EventDefinition => (action, prevState, nextState) => {
  const { groupId, traits } = eventDef(action, prevState, nextState);

  return {
    hitType: 'group',
    groupId,
    traits,
  };
};

export const identifyUser = (
  eventDef: EventDefinition<{
    userId?: string;
    traits?: Traits;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const { userId, traits } = eventDef(action, prevState, nextState);

  return {
    hitType: 'identify',
    userId,
    traits,
  };
};

export const reset = (): EventDefinition => () => ({
  hitType: 'reset',
});
