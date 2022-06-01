import { EventDefinition } from 'redux-beacon';

function debounceEvent(
  msDelay: number,
  eventDef: EventDefinition
): EventDefinition {
  let timeout: NodeJS.Timeout | null = null;
  return function debouncedEventDef(action, prevState, nextState) {
    if (timeout) {
      clearTimeout(timeout);
    }
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve(eventDef(action, prevState, nextState));
      }, msDelay);
    });
  };
}

export default debounceEvent;
