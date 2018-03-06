export function GoogleTagManager(trackingId: string, GTMBridge) {
  GTMBridge.openContainerWithId(trackingId);
  return function GoogleTagManagerTarget(events: any[]) {
    events.forEach(event => {
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
