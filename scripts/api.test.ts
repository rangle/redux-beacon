import { createMiddleware, createMetaReducer } from 'redux-beacon';
import Amplitude from '@redux-beacon/amplitude';
import combineEvents from '@redux-beacon/combine-events';
import ensure from '@redux-beacon/ensure';
import GoogleAnalytics from '@redux-beacon/google-analytics';
import GoogleAnalyticsGtag from '@redux-beacon/google-analytics-gtag';
import GoogleTagManager from '@redux-beacon/google-tag-manager';
import logger from '@redux-beacon/logger';
import OfflineReactNative from '@redux-beacon/offline-react-native';
import OfflineWeb from '@redux-beacon/offline-web';
import RnGoogleAnalytics from '@redux-beacon/react-native-google-analytics';
import RnGoogleTagManager from '@redux-beacon/react-native-google-tag-manager';
import Segment from '@redux-beacon/segment';
import RnSegment from '@redux-beacon/react-native-segment';

[
  [createMiddleware, 'function'],
  [createMetaReducer, 'function'],
  [Amplitude, 'function'],
  [combineEvents, 'function'],
  [ensure, 'function'],
  [GoogleAnalytics, 'function'],
  [GoogleAnalyticsGtag, 'function'],
  [GoogleTagManager, 'function'],
  [logger, 'function'],
  [OfflineReactNative, 'function'],
  [OfflineWeb, 'function'],
  [RnGoogleAnalytics, 'function'],
  [RnGoogleTagManager, 'function'],
  [Segment, 'function'],
  [RnSegment, 'function'],
].forEach(([expectedExport, expectedExportType], index) => {
  test(`${index + 1}. ${expectedExport && expectedExport.name}`, () => {
    expect(typeof expectedExport).toBe(expectedExportType);
  });
});
