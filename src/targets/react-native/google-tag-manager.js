function ReactNativeGoogleTagManager(events, googleTagManager) {
  events.forEach((event) => {
    const eventToPush = (() => {
      if (event.event === undefined && event.hitType !== undefined) {
        return Object.assign({}, event, { event: event.hitType });
      }
      return event;
    })();
    googleTagManager.pushDataLayerEvent(eventToPush);
  });
}

module.exports = { ReactNativeGoogleTagManager };
