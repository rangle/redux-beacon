import { EventDefinition } from 'redux-beacon';

type Validator = (event: any) => boolean;

export function ensure(validator: Validator, eventDef: EventDefinition): EventDefinition;
