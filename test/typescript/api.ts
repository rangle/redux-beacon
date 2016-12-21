import {
  createMiddleware,
  createMetaReducer,
  EventDefinitionsMap,
  EventDefinition,
  EventSchema,
} from '../../index.d';

import { logger } from '../../src/extensions/logger';
import { offlineWeb } from '../../src/extensions/offline-web';
import { offlineReactNative } from '../../src/extensions/offline-react-native';

// --------------------------------------------------

const eventSchema = {
  event: () => true
};

const eventDefinition: EventDefinition = {
  eventName: 'test',
  eventFields() {
    return {};
  },
  eventSchema,
};

const eventsMap: EventDefinitionsMap = {
  TEST: eventDefinition,
};

// --------------------------------------------------

const target = () => {};
createMiddleware(eventsMap, target, { logger, offlineStorage: offlineWeb });
createMetaReducer(eventsMap, target, { logger, offlineStorage: offlineWeb });
