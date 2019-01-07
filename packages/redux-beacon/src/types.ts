export type Target = (events: any[]) => void;

/**
 * Used by Redux Beacon to generate an event or series of
 * events for a given Redux action. An event definition receives the
 * associated action object and the state of the application (before
 * and after the action)
 */
export type EventDefinition<E = any, A = { [key: string]: any }, S = any> = (
  action: A,
  prevState: S,
  nextState: S
) => E;

export type EventsMapper = (
  action: { [key: string]: any }
) => EventDefinition | EventDefinition[];

/**
 * A map between your actions and your analytics events.  Each key
 * must be an action type. Each property must be a valid
 * EventDefinition.
 */
export interface EventsMap {
  [key: string]: EventDefinition;
}

export type LoggerExtension = (
  events: any[],
  action: { [key: string]: any } | null,
  state: any | null,
  isSavedOffline?: boolean,
  wasSavedOffline?: boolean
) => void;

export type ConnectivitySelector = (state: any) => boolean;
export type PurgedEventsHandler = (events: any[]) => void;
export interface OfflineStorageExtension {
  saveEvents: (events: any[]) => Promise<any[]>;
  purgeEvents: (handlePurgedEvents: PurgedEventsHandler) => Promise<void>;
  isConnected: ConnectivitySelector;
}

export interface Extensions {
  logger?: LoggerExtension;
  offlineStorage?: OfflineStorageExtension;
}
