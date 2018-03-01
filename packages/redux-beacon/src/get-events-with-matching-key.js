import keys from 'object-keys';

function getEventsWithMatchingKey(eventsMap, actionType) {
  return keys(eventsMap)
    .filter(key => RegExp(key).test(actionType))
    .map(matchingKey => eventsMap[matchingKey]);
}

export default getEventsWithMatchingKey;
