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
    throw new Error(
      `redux-beacon error: window.${dataLayerName} is not defined. Have you forgotten to include Google Tag Manager and dataLayer?`
    );
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
