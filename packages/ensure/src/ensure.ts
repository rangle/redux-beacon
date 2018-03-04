import { EventDefinition } from 'redux-beacon';

const ensure = (
  isValid: (event: any) => boolean,
  eventDef: EventDefinition
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  return isValid(event) ? event : null;
};

export default ensure;
