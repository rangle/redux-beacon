import { EventDefinition } from '../';

type Validator = (event: any) => boolean;

export function ensure(validator: Validator, eventDef: EventDefinition): EventDefinition;

export function isPromise(value: any): boolean;

export function debounceEvent(msDelay: number, eventDef: EventDefinition): EventDefinition;
