import { Target } from 'redux-beacon';
import { filterEcommEvents, isEcommEvent, removeKeys } from './utils';

const GoogleAnalytics = (): Target => events => {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof (window as any).ga !== 'function') {
    /* tslint:disable: no-console */
    console.warn(`
    [@redux-beacon/google-analytics] Analytics are not being tracked, window.ga 
    is not a function. Please include the Analytics Tag snippet:
    https://support.google.com/analytics/answer/1008080    
    `);
    return;
  }
  events.forEach(event => {
    const customTrackers = event.customTrackerId || event.tracker;
    const trackerIdsRaw = Array.isArray(customTrackers)
      ? customTrackers
      : [customTrackers];

    const trackerIds = trackerIdsRaw.map(
      trackerId => (!!trackerId && !!trackerId.trim() ? `${trackerId}.` : '')
    );

    const ecommPluginType = event.ecommType === 'enhanced' ? 'ec' : 'ecommerce';

    trackerIds.forEach(trackerId => {
      if (isEcommEvent(event)) {
        const callEvent = type =>
          ({
            addItem: () =>
              ga(
                `${trackerId}${ecommPluginType}:addItem`,
                filterEcommEvents(event)
              ),
            addTransaction: () =>
              ga(
                `${trackerId}${ecommPluginType}:addTransaction`,
                filterEcommEvents(event)
              ),
            addImpression: () =>
              ga(
                `${trackerId}${ecommPluginType}:addImpression`,
                filterEcommEvents(event)
              ),
            addProduct: () =>
              ga(
                `${trackerId}${ecommPluginType}:addProduct`,
                filterEcommEvents(event)
              ),
            addPromo: () =>
              ga(
                `${trackerId}${ecommPluginType}:addPromo`,
                filterEcommEvents(event)
              ),
            addAction: () =>
              ga(
                `${trackerId}${ecommPluginType}:setAction`,
                event.actionName,
                filterEcommEvents(event)
              ),
            ecommClear: () => ga(`${trackerId}${ecommPluginType}:clear`),
            ecommSend: () => ga(`${trackerId}${ecommPluginType}:send`),
          }[type]());

        callEvent(event.hitType);
      } else {
        if (event.hitType === 'pageview') {
          ga(`${trackerId}set`, 'page', event.page);
        }
        ga(`${trackerId}send`, removeKeys(event, ['customTrackerId']));
      }
    });
  });
};

export default GoogleAnalytics;
