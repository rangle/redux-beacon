import {
  createMiddleware,
  createMetaReducer,
  createEvents,
  EventsMap,
  EventDefinition,
} from '../../../index.d';

import { logger } from '../../extensions/logger';
import { offlineWeb } from '../../extensions/offline-web';

let eventDefinition: EventDefinition;
eventDefinition = () => ({});

let eventsMap: EventsMap;
eventsMap = { SOME_ACTION_TYPE: eventDefinition };

const target = () => {};
createMiddleware(eventsMap, target, { logger, offlineStorage: offlineWeb });
createMetaReducer(eventsMap, target, { logger, offlineStorage: offlineWeb });

let events: Array<any>;
events = createEvents(eventDefinition, {}, {}, {});
