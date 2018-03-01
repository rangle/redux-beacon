import flatten from 'flatten';

const clean = arr => arr.filter(element => element);

const createEvents = (eventDefs, prevState, action, nextState) => {
  return clean(
    flatten(
      clean(eventDefs).map(eventDef => eventDef(action, prevState, nextState)),
    ),
  );
};

export default createEvents;
