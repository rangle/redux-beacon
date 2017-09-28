function GoogleTagManager(trackingId, GTMBridge) {
  GTMBridge.openContainerWithId(trackingId);
  return function GoogleTagManagerTarget(events) {
    events.forEach((event) => {
      const eventToPush = (() => {
        if (event.event === undefined && event.hitType !== undefined) {
          return Object.assign({}, event, { event: event.hitType });
        }
        return event;
      })();
      GTMBridge.pushDataLayerEvent(eventToPush);
    });
  };
}

module.exports = { GoogleTagManager };
