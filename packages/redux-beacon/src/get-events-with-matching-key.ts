import { EventDefinition, EventsMap } from './types';

function getEventsWithMatchingKey(
  eventsMap: EventsMap,
  actionType: string
): EventDefinition[] {
  const objectKeys = Object.keys(eventsMap);
  const symbolKeys = Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(eventsMap)
    : [];
  return [...objectKeys, ...symbolKeys]
    .filter(key => key === '*' || key === actionType)
    .map(matchingKey => eventsMap[matchingKey]);
}

export default getEventsWithMatchingKey;
