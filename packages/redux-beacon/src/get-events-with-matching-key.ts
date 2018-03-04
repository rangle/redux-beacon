import { EventsMap, EventDefinition } from './types';

function getEventsWithMatchingKey(
  eventsMap: EventsMap,
  actionType: string
): EventDefinition[] {
  return Object.keys(eventsMap)
    .filter(key => RegExp(key).test(actionType))
    .map(matchingKey => eventsMap[matchingKey]);
}

export default getEventsWithMatchingKey;
