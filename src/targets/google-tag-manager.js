function GoogleTagManager(events) {
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
