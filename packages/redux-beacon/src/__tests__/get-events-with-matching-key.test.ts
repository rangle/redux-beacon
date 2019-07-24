import getEventsWithMatchingKey from '../get-events-with-matching-key';

const actionSymbolString = 'actionSymbol';
const actionSymbol = Symbol('actionSymbol');
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
    title: 'action type matches "*"',
    eventsMap: {
      '*': 'eventDefAll',
      ACTION_TYPE_A: 'eventDefAA',
      ACTION_TYPE_B: 'eventDefB',
    },
    actionType: '@@ROUTER@@/some/path',
    expected: ['eventDefAll'],
  },
  {
    title: 'action type matches "*" and a key',
    eventsMap: {
      '*': 'eventDefAll',
      ACTION_TYPE_AA: 'eventDefAA',
      ACTION_TYPE_BB: 'eventDefBB',
    },
    actionType: 'ACTION_TYPE_AA',
    expected: ['eventDefAll', 'eventDefAA'],
  },
  {
    title: 'action type has square braces',
    eventsMap: {
      '[Collection] Add Book Success': 'eventDefAddBookSuccess',
    },
    actionType: '[Collection] Add Book Success',
    expected: ['eventDefAddBookSuccess'],
  },
  {
    title: 'action type can be a Symbol',
    eventsMap: {
      [actionSymbol]: 'eventDefSymbol',
      [actionSymbolString]: 'eventDefString',
      [`Symbol(${actionSymbolString})`]: 'eventDefString',
    },
    actionType: actionSymbol,
    expected: ['eventDefSymbol'],
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
