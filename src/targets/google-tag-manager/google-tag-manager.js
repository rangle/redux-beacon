const GoogleTagManager = ({ dataLayerName = 'dataLayer' } = {}) => events => {
  if (typeof window === 'undefined') {
    return;
  }
  if (
    !window[dataLayerName] ||
    typeof window[dataLayerName].push !== 'function'
  ) {
    throw new Error(
      `redux-beacon error: window.${dataLayerName} is not defined. Have you forgotten to include Google Tag Manager and dataLayer?`
    );
  }
  events.forEach(event => {
    const eventToPush = (() => {
      if (event.event === undefined && event.hitType !== undefined) {
        return Object.assign({}, event, { event: event.hitType });
      }
      return event;
    })();
    window[dataLayerName].push(eventToPush);
  });
};

module.exports = { GoogleTagManager };
