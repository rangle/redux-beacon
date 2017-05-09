function GoogleTagManager(events) {
  if (typeof window === 'undefined') {
    return;
  }
  if (!window.dataLayer || typeof window.dataLayer.push !== 'function') {
    throw new Error('window.dataLayer is not defined. Have you forgotten to include Google Tag Manager and dataLayer?');
  }
  events.forEach((event) => {
    const eventToPush = (() => {
      if (event.event === undefined && event.hitType !== undefined) {
        return Object.assign({}, event, { event: event.hitType });
      }
      return event;
    })();
    window.dataLayer.push(eventToPush);
  });
}

module.exports = { GoogleTagManager };
