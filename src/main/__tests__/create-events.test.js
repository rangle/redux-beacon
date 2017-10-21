import { createEvents } from '../';

describe('createEvents(eventDef, prevState, action)', () => {
  [
    {
      title: 'event definition returns undefined',
      eventDef: () => {},
      expected: [],
    },
    {
      title: 'event definition returns null',
      eventDef: () => null,
      expected: [],
    },
    {
      title: 'event definition returns an empty array',
      eventDef: () => [],
      expected: [],
    },
    {
      title: 'event definition returns a string',
      eventDef: () => 'str',
      expected: ['str'],
    },
    {
      title: 'event definition returns a number',
      eventDef: () => 123,
      expected: [123],
    },
    {
      title: 'event definition returns a POJO',
      eventDef: () => ({ event: 'pageview', route: '/login' }),
      expected: [{ event: 'pageview', route: '/login' }],
    },
    {
      title: 'event definition uses data from action',
      eventDef: action => ({ route: action.payload }),
      action: { type: 'ROUTE_CHANGED', payload: '/home' },
      expected: [{ route: '/home' }],
    },
    {
      title: 'event definition uses data from prevState',
      eventDef: (_, prevState) => ({ something: prevState.whatever }),
      prevState: { whatever: 'kent beck' },
      expected: [{ something: 'kent beck' }],
    },
    {
      title: 'event definition uses data from prevState & action',
      eventDef: (action, prevState) => ({
        referrer: prevState.route,
        route: action.payload,
      }),
      prevState: { route: '/' },
      action: { payload: '/checkout' },
      expected: [{ referrer: '/', route: '/checkout' }],
    },
    {
      title: 'event definition returns an array of events',
      eventDef: () => [
        { hitType: 'pageview' },
        { hitType: 'event' },
        { hitType: 'timing' },
      ],
      expected: [
        { hitType: 'pageview' },
        { hitType: 'event' },
        { hitType: 'timing' },
      ],
    },
    {
      title: 'event definition returns an array of events, with some nulls',
      eventDef: () => [
        { hitType: 'pageview' },
        null,
        { hitType: 'timing' },
        null,
      ],
      expected: [{ hitType: 'pageview' }, { hitType: 'timing' }],
    },
    {
      title: 'event definition uses previous state',
      eventDef: (action, prevState, nextState) => ({
        hitType: 'event',
        numActions: nextState.numActions,
      }),
      nextState: { numActions: 3 },
      expected: [
        {
          hitType: 'event',
          numActions: 3,
        },
      ],
    },
  ].forEach((scenario, index) => {
    const {
      title,
      eventDef,
      prevState,
      nextState,
      action,
      expected,
    } = scenario;

    test(`${index + 1}. ${title}` || 'no title', () => {
      if (
        title === undefined ||
        eventDef === undefined ||
        expected === undefined
      ) {
        throw new Error('tests require title, eventDef, and expected keys');
      }
      const events = createEvents(
        eventDef,
        prevState || {},
        action || {},
        nextState || {}
      );
      expect(events).toEqual(expected);
    });
  });
});
