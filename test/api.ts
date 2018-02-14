import {
  createMiddleware,
  createMetaReducer,
  createEvents,
  EventsMap,
  EventDefinition,
} from 'redux-beacon';

import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';
import { Segment } from 'redux-beacon/targets/segment';
import { Amplitude } from 'redux-beacon/targets/amplitude';
import {
  GoogleAnalytics as RNGA,
  GoogleTagManager as RNGTM,
} from 'redux-beacon/targets/react-native';
import { GoogleAnalyticsGtag } from 'redux-beacon/targets/google-analytics-gtag';


import { logger } from 'redux-beacon/extensions/logger';
import { offlineWeb } from 'redux-beacon/extensions/offline-web';
import { offlineReactNative } from 'redux-beacon/extensions/offline-react-native';

import { ensure } from 'redux-beacon/utils';
import { debounceEvent } from 'redux-beacon/utils';
