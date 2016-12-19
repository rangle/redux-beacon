// Type definitions for redux-beacon
// Project: https://github.com/rangle/redux-beacon

export interface EventSchema {
  [key: string]: (eventFieldValue: any) => boolean;
}

/**
 * Used by ReduxBeacon to generate an event for a given Redux action.
 *
 * eventName
 * Use this property to specify the name of the event you want to emit
 * for the associated action. If not provided, the event name defaults
 * to the action type.
 *
 * eventFields
 * Attach a function to this property to define any variables you
 * would like to emit with the event. Any function assigned to this
 * property will receive the state of the application (before the
 * action), and the associated action object. Any property named
 * "event" in the returned object will override any defaults or any
 * event names defined in `eventName`.
 *
 * eventSchema
 * Use this property to define a schema for the event. Attach
 * validation functions for each property in the event that you want
 * to validate. If any of these validation functions return false,
 * ReduxBeacon will not emit the event.
 */
export type EventDefinition = { eventName: string } | { eventFields(prevState: any, action: any): any } | { eventSchema: EventSchema };

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
