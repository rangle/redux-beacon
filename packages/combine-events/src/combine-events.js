import flatten from 'flatten';

const combineEvents = (...eventDefs) => (action, prevState, nextState) =>
  flatten(eventDefs.map(eventDef => eventDef(action, prevState, nextState)));

export default combineEvents;
