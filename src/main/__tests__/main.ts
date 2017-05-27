import {
  createMiddleware,
  createMetaReducer,
  createEvents,
  EventDefinitionsMap,
  EventDefinition,
  EventSchema,
} from '../../../index.d';

import { logger } from '../../extensions/logger';
import { offlineWeb } from '../../extensions/offline-web';

let eventSchema: EventSchema;
eventSchema = { event: () => true };
eventSchema = { event: () => false };

let eventDefinition: EventDefinition;
eventDefinition = { eventFields() {}, eventSchema: {} };

let eventsMap: EventDefinitionsMap;
eventsMap = { SOME_ACTION_TYPE: eventDefinition };

const target = () => {};
createMiddleware(eventsMap, target, { logger, offlineStorage: offlineWeb });
createMetaReducer(eventsMap, target, { logger, offlineStorage: offlineWeb });

let events: Array<any>
events = createEvents(eventDefinition, {}, {});
events = createEvents([eventDefinition, eventDefinition], {}, {});
