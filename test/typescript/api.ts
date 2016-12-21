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

import { GoogleTagManager } from '../../src/targets/google-tag-manager';
import { GoogleAnalytics } from '../../src/targets/google-analytics';
import { segment } from '../../src/targets/segment';

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

const ga = GoogleAnalytics( () => {});
createMiddleware(eventsMap, ga, { logger, offlineStorage: offlineWeb });
createMetaReducer(eventsMap, ga, { logger, offlineStorage: offlineWeb });

// --------------------------------------------------

const gtm = GoogleTagManager({ push(){} });
createMiddleware(eventsMap, gtm, { logger, offlineStorage: offlineWeb });
createMetaReducer(eventsMap, gtm, { logger, offlineStorage: offlineWeb });

// --------------------------------------------------

createMiddleware(eventsMap, segment, { logger, offlineStorage: offlineWeb });
createMetaReducer(eventsMap, segment, { logger, offlineStorage: offlineWeb });

// --------------------------------------------------


