export default function debounceEvent(msDelay, eventDef) {
  let timeout;
  return function debouncedEventDef(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    return new Promise(resolve => {
      timeout = setTimeout(() => {
        resolve(eventDef(...args));
      }, msDelay);
    });
  };
}
