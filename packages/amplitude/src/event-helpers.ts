import { EventDefinition } from 'redux-beacon';
import { AmplitudeProp } from './types';

export const logEvent = (
  eventDef: EventDefinition<{
    type: string;
    properties?: { [key: string]: AmplitudeProp };
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);

  if (event === null) { return null; }

  return {
    hitType: 'logEvent',
    eventType: event.type,
    eventProperties: event.properties,
  };
};

export const setUserId = (
  eventDef: EventDefinition<string>
): EventDefinition => (action, prevState, nextState) => {
  const userId = eventDef(action, prevState, nextState);

  return {
    hitType: 'setUserId',
    userId,
  };
};

export const logout = (): EventDefinition => () => [
  {
    hitType: 'setUserId',
    userId: null,
  },
  {
    hitType: 'regenerateDeviceId',
  },
];

export const setUserProperties = (
  eventDef: EventDefinition<{ [key: string]: AmplitudeProp | AmplitudeProp[] }>
): EventDefinition => (action, prevState, nextState) => {
  const userProperties = eventDef(action, prevState, nextState);

  return {
    hitType: 'setUserProperties',
    userProperties,
  };
};
