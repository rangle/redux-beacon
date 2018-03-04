import * as flatten from 'array-flatten';
import { EventDefinition } from 'redux-beacon';

const combineEvents = (...eventDefs: EventDefinition[]) => (
  action: any,
  prevState: any,
  nextState: any
) => flatten(eventDefs.map(eventDef => eventDef(action, prevState, nextState)));

export default combineEvents;
