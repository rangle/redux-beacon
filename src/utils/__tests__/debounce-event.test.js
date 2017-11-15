import debounceEvent from '../debounce-event';

jest.useFakeTimers();

test('debounceEvent(msDelay, eventDef)', () => {
  const msDelay = 1000;
  const eventDef = value => ({ event: 'event-name', value });

  const debouncedEvent = debounceEvent(msDelay, eventDef);

  const result = expect(
    Promise.race([
      debouncedEvent('a'),
      debouncedEvent('b'),
      debouncedEvent('c'),
    ])
  ).resolves.toEqual({ event: 'event-name', value: 'c' });

  jest.runTimersToTime(1500);

  return result;
});
