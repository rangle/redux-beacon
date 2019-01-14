import { Target } from 'redux-beacon';

import { Event } from './types'

function Segment(SegmentAnalytics: any): Target {
  function target(events: Event[]) {
    events.forEach(event => {
      switch (event.hitType) {
        case 'identify':
          SegmentAnalytics.identify(event.userId, event.traits || {});
          break;
        case 'group':
          SegmentAnalytics.group(event.groupId, event.traits || {});
          break;
        case 'pageview':
          SegmentAnalytics.screen(event.name, event.properties || {});
          break;
        case 'event':
          SegmentAnalytics.track(event.eventAction, event.properties || {});
          break;
        case 'alias':
          SegmentAnalytics.alias(event.userId);
          break;
        case 'reset':
          SegmentAnalytics.reset();
          break;
        default:
          break;
      }
    });
  }

  return target;
}

export default Segment;
