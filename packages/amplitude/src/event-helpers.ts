import { EventHelperInput, AmplitudeProp } from './types';

export const logEvent = (
  eventDef: EventHelperInput<{
    type: string;
    properties?: { [key: string]: AmplitudeProp };
  }>
) => (...args: any[]) => {
  const event = eventDef(...args);

  if (event === null) return null;

  return {
    hitType: 'logEvent',
    eventType: event.type,
    eventProperties: event.properties,
  };
};

export const setUserId = (eventDef: EventHelperInput<string>) => (
  action: any,
  prevState: any,
  nextState: any
) => {
  const userId = eventDef(action, prevState, nextState);

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

export const setUserProperties = (
  eventDef: EventHelperInput<{ [key: string]: AmplitudeProp | AmplitudeProp[] }>
) => (action: any, prevState: any, nextState: any) => {
  const userProperties = eventDef(action, prevState, nextState);

  return {
    hitType: 'setUserProperties',
    userProperties,
  };
};
