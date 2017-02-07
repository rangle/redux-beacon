// Type definitions for redux-beacon
// Project: https://github.com/rangle/redux-beacon

export interface EventSchema {
  [key: string]: (eventFieldValue: any) => boolean;
}

/**
 * Used by Redux-Beacon to generate an event for a given Redux action.
 *
 * eventFields
 * Attach a function to this property to define any variables you
 * would like to emit with the event. Any function assigned to this
 * property will receive the state of the application (before the
 * action), and the associated action object.
 *
 * eventSchema
 * Use this property to define a schema for the event. Attach
 * validation functions for each property in the event that you want
 * to validate. If any of these validation functions return false,
 * ReduxBeacon will not emit the event.
 */
export interface EventDefinition {
  eventFields(action: any, prevState: any): any;
  eventSchema?: EventSchema;
}

/**
 * A map between your actions and your analytics events.  Each key
 * must be an action type. Each property must be a valid
 * EventDefinition or an array of EventDefinitions.
 */
export interface EventDefinitionsMap {
  [key: string]: EventDefinition | Array<EventDefinition>;
}

type Extensions = { logger(): void } | { offlineStorage: any };
type Target = (events: any[]) => void;

/**
 * Create Redux middleware that synchronizes actions to analytics events.
 */
export function createMiddleware(
  eventDefinitions: EventDefinitionsMap,
  target: Target,
  extensions?: Extensions
  ): any;

/**
 * Create a meta reducer that synchronizes actions to analytics events.
 */
export function createMetaReducer(
  eventDefinitions: EventDefinitionsMap,
  target: Target,
  extensions?: Extensions
): any;

/**
 * Create events from an event definition.
 * Use this function for testing your event definitions.
 */
export function createEvents(
  eventDefinition: EventDefinition | Array<EventDefinition>,
  prevState: any,
  action: any,
): Array<any>;
