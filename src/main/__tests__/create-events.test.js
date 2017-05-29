const createEvents = require('../create-events');

describe('createEvents(eventDef, prevState, action)', () => {
  [
    {
      title: 'event definition is an empty object',
      eventDef: {},
      expected: [],
    },

    {
      title: 'event definition is an empty array',
      eventDef: [],
      expected: [],
    },

    {
      title: 'basic event definition',
      eventDef: {
        eventFields: () => ({ event: 'pageview', route: '/login' }),
      },
      expected: [{ event: 'pageview', route: '/login' }],
    },

    {
      title: 'event definition uses data from action',
      eventDef: {
        eventFields: action => ({ route: action.payload }),
      },
      action: { type: 'ROUTE_CHANGED', payload: '/home' },
      expected: [{ route: '/home' }],
    },

    {
      title: 'event definition uses data from prevState',
      eventDef: {
        eventFields: (_, prevState) => ({ something: prevState.whatever }),
      },
      prevState: { whatever: 'kent beck' },
      expected: [{ something: 'kent beck' }],
    },

    {
      title: 'event definition uses data from prevState & action',
      eventDef: {
        eventFields: (action, prevState) => ({
          referrer: prevState.route,
          route: action.payload,
        }),
      },
      prevState: { route: '/' },
      action: { payload: '/checkout' },
      expected: [{ referrer: '/', route: '/checkout' }],
    },

    {
      title: 'event definition has a passing schema',
      eventDef: {
        eventFields: () => ({ event: 'pageview', route: '/login' }),
        eventSchema: { route: value => value !== '/home' },
      },
      expected: [{ event: 'pageview', route: '/login' }],
    },

    {
      title: 'event definition has a failing schema',
      eventDef: {
        eventFields: () => ({ event: 'pageview', route: '/login' }),
        eventSchema: { route: value => value !== '/login' },
      },
      expected: [],
    },

    {
      title: 'an array of event definitions',
      eventDef: [
        { eventFields: () => ({ hitType: 'pageview' }) },
        { eventFields: () => ({ hitType: 'event' }) },
        { eventFields: () => ({ hitType: 'timing' }) },
      ],
      expected: [
        { hitType: 'pageview' },
        { hitType: 'event' },
        { hitType: 'timing' },
      ],
    },

    {
      title: "event definition's eventFields returns undefined",
      eventDef: { eventFields: () => {} },
      expected: [],
    },

    {
      title: "event definition's eventFields returns undefined & has failing schema",
      eventDef: {
        eventFields: () => {},
        eventSchema: { someProp: value => typeof value === 'string' },
      },
      expected: [],
    },

    {
      title: "event definition's eventFields returns null",
      eventDef: { eventFields: () => null },
      expected: [],
    },

    {
      title: "event definition's eventFields returns a string",
      eventDef: { eventFields: () => 'some string' },
      expected: ['some string'],
    },

    {
      title: "event definition's eventFields returns an array of events",
      eventDef: { eventFields: () => [{ someProp: 'some string' }, { someProp: 'other string' }] },
      expected: [{ someProp: 'some string' }, { someProp: 'other string' }],
    },

    {
      title: "event definition's eventFields returns an array of events & has failing schema",
      eventDef: {
        eventFields: () => [{ someProp: 'some string' }, { someProp: 'other string' }],
        eventSchema: { someProp: value => value !== 'other string' },
      },
      expected: [{ someProp: 'some string' }],
    },

    {
      title: "event definition's eventFields returns a string & has failing schema",
      eventDef: {
        eventFields: () => 'some string',
        eventSchema: { someProp: value => value !== 'some string' },
      },
      expected: ['some string'],
    },

    {
      title: "event definition's eventFields returns a number",
      eventDef: { eventFields: () => 1234 },
      expected: [1234],
    },

    {
      title: "event definition's eventFields returns a number & has failing schema",
      eventDef: {
        eventFields: () => 1234,
        eventSchema: { someProp: value => value !== 1234 },
      },
      expected: [1234],
    },
  ].forEach((scenario) => {
    const {
      title,
      eventDef,
      prevState,
      action,
      expected,
    } = scenario;

    test(title || 'no title', () => {
      if (title === undefined || eventDef === undefined || expected === undefined) {
        throw new Error('tests require title, eventDef, and expected keys');
      }
      expect(createEvents(eventDef, prevState || {}, action || {})).toEqual(expected);
    });
  });
});
