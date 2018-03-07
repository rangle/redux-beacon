import combineEvents from '../combine-events';

it('combines multiple event definitions into one and flattens the events', () => {
  const simpleEventDef = (action, prevState, nextState) => ({
    hitType: 'simpleEventDef',
    propA: action.payload,
    propB: prevState.propB,
    propC: nextState.propC,
  });

  const arrEventDef = action => [
    { hitType: 'arrEventDef0', propD: action.payload },
    { hitType: 'arrEventDef1', propE: action.payload + 1 },
  ];

  const promiseEventDef = () => Promise.resolve();

  const combinedEventDefs = combineEvents(
    simpleEventDef,
    arrEventDef,
    promiseEventDef,
  );

  const result = combinedEventDefs(
    { payload: 9 },
    { propB: 'ross' },
    { propC: 'rachel' },
  );

  expect(result).toEqual([
    {
      hitType: 'simpleEventDef',
      propA: 9,
      propB: 'ross',
      propC: 'rachel',
    },
    { hitType: 'arrEventDef0', propD: 9 },
    { hitType: 'arrEventDef1', propE: 10 },
    Promise.resolve(),
  ]);
});
