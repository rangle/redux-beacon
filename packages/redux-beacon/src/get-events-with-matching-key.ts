import { EventDefinition, EventsMap } from './types';

function getEventsWithMatchingKey(
  eventsMap: EventsMap,
  actionType: string
): EventDefinition[] {
  return Object.keys(eventsMap)
    .filter(key => key === '*' || key === actionType)
    .map(matchingKey => eventsMap[matchingKey]);
}

export default getEventsWithMatchingKey;
