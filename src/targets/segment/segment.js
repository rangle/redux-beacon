const Segment = () => events => {
  if (!window) return;
  if (!window.analytics) {
    throw new Error(
      'window.analytics is not defined, Have you forgotten to include the Segment tracking snippet?'
    );
  }
  events.forEach(event => {
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
};

module.exports = { Segment };
