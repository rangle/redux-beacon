import * as flatten from 'array-flatten';
import { EventDefinition } from './types';

const clean = (arr: any[]) => arr.filter(element => element);

const createEvents = (
  eventDefs: EventDefinition[],
  prevState: any,
  action: any,
  nextState: any
) => {
  return clean(
    flatten(
      clean(eventDefs).map(eventDef => eventDef(action, prevState, nextState))
    )
  );
};

export default createEvents;
