import { filterEcommEvents, isEcommEvent } from '../../utils';

const GoogleAnalytics = () => events => {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.ga !== 'function') {
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
            window.ga(
              `${trackerId}${ecommPluginType}:addItem`,
              filterEcommEvents(event)
            ),
          addTransaction: () =>
            window.ga(
              `${trackerId}${ecommPluginType}:addTransaction`,
              filterEcommEvents(event)
            ),
          addImpression: () =>
            window.ga(
              `${trackerId}${ecommPluginType}:addImpression`,
              filterEcommEvents(event)
            ),
          addProduct: () =>
            window.ga(
              `${trackerId}${ecommPluginType}:addProduct`,
              filterEcommEvents(event)
            ),
          addPromo: () =>
            window.ga(
              `${trackerId}${ecommPluginType}:addPromo`,
              filterEcommEvents(event)
            ),
          addAction: () =>
            window.ga(
              `${trackerId}${ecommPluginType}:addAction`,
              event.actionName,
              filterEcommEvents(event)
            ),
          ecommClear: () => window.ga(`${trackerId}${ecommPluginType}:clear`),
          ecommSend: () => window.ga(`${trackerId}${ecommPluginType}:send`),
        }[type]());

      callEvent(event.hitType);
    } else {
      if (event.hitType === 'pageview') {
        window.ga(`${trackerId}set`, 'page', event.page);
      }
      window.ga(`${trackerId}send`, event);
    }
  });
};

module.exports = { GoogleAnalytics };
