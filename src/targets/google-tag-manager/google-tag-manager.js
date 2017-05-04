function GoogleTagManager(events) {
  if (typeof window === 'undefined' || !window.dataLayer || typeof window.dataLayer.push !== 'function') {
    return;
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
