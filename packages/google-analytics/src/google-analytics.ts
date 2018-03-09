import { filterEcommEvents, isEcommEvent } from './utils';
import { Target } from 'redux-beacon';

const GoogleAnalytics = (): Target => events => {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof (<any>window).ga !== 'function') {
    throw new Error(
      'window.ga is not defined, Have you forgotten to include Google Analytics?'
    );
  }
  events.forEach(event => {
    const customTrackerId = event.customTrackerId || event.tracker;
    const trackerId =
      !!customTrackerId && !!customTrackerId.trim()
        ? `${customTrackerId}.`
        : '';
    const ecommPluginType = event.ecommType === 'enhanced' ? 'ec' : 'ecommerce';

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
              `${trackerId}${ecommPluginType}:addAction`,
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
      ga(`${trackerId}send`, event);
    }
  });
};

export default GoogleAnalytics;
