import { createEvents } from '../';

describe('createEvents(eventDefs, prevState, action)', () => {
  [
    {
      title: 'event definition is an empty array',
      eventDefs: [],
      expected: [],
    },
    {
      title: 'event definition returns undefined',
      eventDefs: [() => {}],
      expected: [],
    },
    {
      title: 'event definition returns null',
      eventDefs: [() => null],
      expected: [],
    },
    {
      title: 'event definition is undefined',
      eventDefs: [undefined],
      expected: [],
    },
    {
      title: 'event definition returns an empty array',
      eventDefs: [() => []],
      expected: [],
    },
    {
      title: 'event definition returns a string',
      eventDefs: [() => 'str'],
      expected: ['str'],
    },
    {
      title: 'event definition returns a number',
      eventDefs: [() => 123],
      expected: [123],
    },
    {
      title: 'event definition returns a POJO',
      eventDefs: [() => ({ event: 'pageview', route: '/login' })],
      expected: [{ event: 'pageview', route: '/login' }],
    },
    {
      title: 'event definition uses data from action',
      eventDefs: [action => ({ route: action.payload })],
      action: { type: 'ROUTE_CHANGED', payload: '/home' },
      expected: [{ route: '/home' }],
    },
    {
      title: 'event definition uses data from prevState',
      eventDefs: [(_, prevState) => ({ something: prevState.whatever })],
      prevState: { whatever: 'kent beck' },
      expected: [{ something: 'kent beck' }],
    },
    {
      title: 'event definition uses data from prevState & action',
      eventDefs: [
        (action, prevState) => ({
          referrer: prevState.route,
          route: action.payload,
        }),
      ],
      prevState: { route: '/' },
      action: { payload: '/checkout' },
      expected: [{ referrer: '/', route: '/checkout' }],
    },
    {
      title: 'event definition returns an array of events',
      eventDefs: [
        () => [
          { hitType: 'pageview' },
          { hitType: 'event' },
          { hitType: 'timing' },
        ],
      ],
      expected: [
        { hitType: 'pageview' },
        { hitType: 'event' },
        { hitType: 'timing' },
      ],
    },
    {
      title: 'event definition returns an array of events, with some nulls',
      eventDefs: [
        () => [{ hitType: 'pageview' }, null, { hitType: 'timing' }, null],
      ],
      expected: [{ hitType: 'pageview' }, { hitType: 'timing' }],
    },
    {
      title: 'event definition uses previous state',
      eventDefs: [
        (action, prevState, nextState) => ({
          hitType: 'event',
          numActions: nextState.numActions,
        }),
      ],
      nextState: { numActions: 3 },
      expected: [
        {
          hitType: 'event',
          numActions: 3,
        },
      ],
    },
    {
      title: 'event definition returns a Promise',
      eventDefs: [() => Promise.resolve()],
      expected: [Promise.resolve()],
    },
    {
      title: 'multiple event definitions for an action - simple',
      eventDefs: [
        action => ({ hitType: 'pageview', paramA: action.payload }),
        (action, prevState) => ({
          hitType: 'event',
          paramA: action.payload,
          paramB: prevState.someProperty,
        }),
      ],
      action: { type: 'WHATEVER', payload: 'something' },
      prevState: { someProperty: 'someValue' },
      expected: [
        { hitType: 'pageview', paramA: 'something' },
        { hitType: 'event', paramA: 'something', paramB: 'someValue' },
      ],
    },
    {
      title: 'multiple event definitions for an action - multiple events',
      eventDefs: [
        action => ({ hitType: 'pageview', paramA: action.payload }),
        () => [{ hitType: 'event' }, { hitType: 'timing' }],
      ],
      action: { type: 'WHATEVER', payload: 'something' },
      expected: [
        { hitType: 'pageview', paramA: 'something' },
        { hitType: 'event' },
        { hitType: 'timing' },
      ],
    },
    {
      title: 'multiple event definitions for an action - async events',
      eventDefs: [
        action => ({ hitType: 'pageview', paramA: action.payload }),
        () => Promise.resolve(),
      ],
      action: { type: 'WHATEVER', payload: 'something' },
      expected: [
        { hitType: 'pageview', paramA: 'something' },
        Promise.resolve(),
      ],
    },
  ].forEach((scenario, index) => {
    const {
      title,
      eventDefs,
      prevState,
      nextState,
      action,
      expected,
    } = scenario;

    test(`${index + 1}. ${title}` || 'no title', () => {
      if (title === undefined || expected === undefined) {
        throw new Error('tests require title, eventDefs, and expected keys');
      }
      const events = createEvents(
        eventDefs,
        prevState || {},
        action || {},
        nextState || {},
      );
      expect(events).toEqual(expected);
    });
  });
});
