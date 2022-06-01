import debounceEvent from '../debounce-event';

jest.useFakeTimers();

test('debounceEvent(msDelay, eventDef)', () => {
  const msDelay = 1000;
  const eventDef = value => ({ event: 'event-name', value });

  const debouncedEvent = debounceEvent(msDelay, eventDef);

  const result = expect(
    Promise.race([
      debouncedEvent({ type: 'a' }, {}, {}),
      debouncedEvent({ type: 'b' }, {}, {}),
      debouncedEvent({ type: 'c' }, {}, {}),
    ])
  ).resolves.toEqual({ event: 'event-name', value: { type: 'c' } });

  jest.advanceTimersByTime(1500);

  return result;
});
