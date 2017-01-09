/**
 * An function that sends an event to segment.io
 */
function sendSegmentEvent(events) {
  if (!window || !window.analytics) {
    return;
  }
  events.forEach((event) => {
    switch (event.hitType) {
      case 'identify':
        window.analytics.identify(event.userId, event);
        break;
      case 'group':
        window.analytics.group(event.groupId, event);
        break;
      case 'pageview':
        window.analytics.page(event.page);
        break;
      case 'event':
        window.analytics.track(event.eventAction, event);
        break;
      case 'alias':
        window.analytics.alias(event.userId);
        break;
      default:
        break;
    }
  });
}

module.exports = {
  Segment: sendSegmentEvent,
};
