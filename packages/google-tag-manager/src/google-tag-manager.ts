import { Target } from 'redux-beacon';
import { Options } from './types';
import { convertFromGoogleAnalyticsEventIfNeeded } from './utils';

const GoogleTagManager = ({
  dataLayerName = 'dataLayer',
}: Options = {}): Target => events => {
  if (typeof window === 'undefined') {
    return;
  }

  if (
    !(window as any)[dataLayerName] ||
    typeof (window as any)[dataLayerName].push !== 'function'
  ) {
    /* tslint:disable: no-console */
    console.warn(`
    [@redux-beacon/google-tag-manager] Events are not being tracked, window.${dataLayerName}
    is not a function. Please include the Google Tag Manager snippet:
    https://developers.google.com/tag-manager/quickstart
    `);

    return;
  }

  events.forEach(event => {
    if (typeof event === 'object') {
      (window as any)[dataLayerName].push(
        convertFromGoogleAnalyticsEventIfNeeded(event)
      );
    }
  });
};

export default GoogleTagManager;
