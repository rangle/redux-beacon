import { Target } from 'redux-beacon';

const Segment = (): Target => events => {
  if (!window) { return; }
  if (!(window as any).analytics) {
    throw new Error(
      'window.analytics is not defined, Have you forgotten to include the Segment tracking snippet?'
    );
  }
  events.forEach(event => {
    switch (event.hitType) {
      case 'identify':
        analytics.identify(event.userId, event.traits, event.options);
        break;
      case 'group':
        analytics.group(event.groupId, event.traits, event.options);
        break;
      case 'pageview':
        analytics.page(event.page, event.name, event.properties, event.options);
        break;
      case 'event':
        analytics.track(event.eventAction, event);
        break;
      case 'alias':
        analytics.alias(event.userId, event.previousId, event.options);
        break;
      default:
        break;
    }
  });
};

export default Segment;
