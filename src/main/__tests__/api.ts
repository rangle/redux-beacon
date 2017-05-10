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
import { offlineReactNative } from '../../extensions/offline-react-native';

// --------------------------------------------------

const eventSchema: EventSchema = {
  event: () => true,
};

const eventDefinition: EventDefinition = {
  eventFields() {},
  eventSchema,
};

const eventsMap: EventDefinitionsMap = {
  TEST: eventDefinition,
};

// --------------------------------------------------

const target = () => {};
createMiddleware(eventsMap, target, { logger, offlineStorage: offlineWeb });
createMetaReducer(eventsMap, target, { logger, offlineStorage: offlineWeb });

// --------------------------------------------------
let events: Array<any>
events = createEvents(eventDefinition, {}, {});
events = createEvents([eventDefinition, eventDefinition], {}, {});
