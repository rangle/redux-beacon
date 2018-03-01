import getEventsWithMatchingKey from '../get-events-with-matching-key';

[
  {
    title: 'action type matches a key exactly',
    eventsMap: {
      ACTION_TYPE_C: 'eventDefC',
      ACTION_TYPE_AA: 'eventDefAA',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: 'ACTION_TYPE_AA',
    expected: ['eventDefAA'],
  },
  {
    title: 'action type does not match any key',
    eventsMap: {
      ACTION_TYPE_A: 'eventDefA',
      ACTION_TYPE_AA: 'eventDefAA',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: 'ACTION_TYPE_C',
    expected: [],
  },
  {
    title: 'action type matches a key pattern',
    eventsMap: {
      '@@ROUTER@@': 'eventDefRouter',
      ACTION_TYPE_A: 'eventDefAA',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: '@@ROUTER@@/some/path',
    expected: ['eventDefRouter'],
  },
  {
    title: 'action type matches a key pattern and has exact match',
    eventsMap: {
      ACTION_TYPE_A: 'eventDefA',
      ACTION_TYPE_AA: 'eventDefAA',
      ACTION_TYPE_BB: 'eventDefBB',
    },
    actionType: 'ACTION_TYPE_AA',
    expected: ['eventDefA', 'eventDefAA'],
  },
  {
    title: 'action type matches multiple key patterns',
    eventsMap: {
      ACTION_TYPE: 'eventDefX',
      ACTION_TYPE_A: 'eventDefA',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: 'ACTION_TYPE_AA',
    expected: ['eventDefX', 'eventDefA'],
  },
  {
    title: 'action type matches .* pattern',
    eventsMap: {
      '.*': 'eventDefAll',
      ACTION_TYPE_A: 'eventDefA',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: 'ANY_ACTION_TYPE',
    expected: ['eventDefAll'],
  },
  {
    title: 'action type matches .* pattern and key pattern',
    eventsMap: {
      '.*': 'eventDefAll',
      ACTION_TYPE: 'eventDefAny',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: 'ACTION_TYPE_Z',
    expected: ['eventDefAll', 'eventDefAny'],
  },
  {
    title: 'action type matches .* pattern and has exact match',
    eventsMap: {
      '.*': 'eventDefAll',
      ACTION_TYPE_Z: 'eventDefZ',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: 'ACTION_TYPE_Z',
    expected: ['eventDefAll', 'eventDefZ'],
  },
].forEach((scenario, index) => {
  const { title, eventsMap, actionType, expected, only } = scenario;

  const runTest = only ? test.only : test;

  runTest(`${index + 1}. ${title}`, () => {
    if (title === undefined || expected === undefined) {
      throw new Error('tests require title, eventDefs, and expected keys');
    }
    const eventDefs = getEventsWithMatchingKey(eventsMap, actionType);
    expect(eventDefs).toEqual(expected);
  });
});
