// Type definitions for redux-beacon
// Project: https://github.com/rangle/redux-beacon

interface Action {
  type: any;
}

/**
 * Used by Redux Beacon to generate an event or series of
 * events for a given Redux action. An event definition receives the
 * associated action object and the state of the application (before
 * and after the action).
 */
export type EventDefinition = (
  action: Action,
  prevState: any,
  nextState: any
) => any | Array<any>;

/**
 * A map between your actions and your analytics events.  Each key
 * must be an action type. Each property must be a valid
 * EventDefinition.
 */
export interface EventDefinitionsMap {
  [key: string]: EventDefinition;
}

export type Extensions = { logger(): void } | { offlineStorage: any };
export type Target = (events: any[]) => void;

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
  eventDefinition: EventDefinition,
  prevState: any,
  action: any,
  nextState: any
): Array<any>;
