const { filterEcommEvents, isEcommEvent } = require('../../utils');

function GoogleAnalytics(events) {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.ga !== 'function') {
    throw new Error('window.ga is not defined, Have you forgotten to include Google Analytics?');
  }
  events.forEach((event) => {
    const customTrackerId = event.customTrackerId || event.tracker;
    const trackerId = !!customTrackerId && !!customTrackerId.trim() ? `${customTrackerId}.` : '';
      
    if (isEcommEvent(event)) {
      const callEvent = type => ({
        addItem: () => window.ga(`${trackerId}ecommerce:addItem`, filterEcommEvents(event)),
        addTransaction: () => window.ga(`${trackerId}ecommerce:addTransaction`, filterEcommEvents(event)),
        ecommClear: () => window.ga(`${trackerId}ecommerce:clear`),
        ecommSend: () => window.ga(`${trackerId}ecommerce:send`),
      }[type])();

      callEvent(event.hitType);
    } else {
      if (event.hitType === 'pageview') {
        window.ga(`${trackerId}set`, 'page', event.page);
      }
      window.ga(`${trackerId}send`, event);
    }
  });
}

module.exports = { GoogleAnalytics };
