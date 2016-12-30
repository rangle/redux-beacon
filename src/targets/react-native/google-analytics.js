import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

/**
 * Filter event object by certain keys.
 * @param event {Object}
 * @param accepted {Array}
 * @returns {Object}
 */
function getOptionals(event, accepted) {
  var result = {};
  accepted.forEach((key) => {
    if (event[key] !== undefined) {
      result[key] = event[key];
    }
  });
  return result;
}

/**
 * Used to create a Google Analytics tracker
 * Provides a target that converts events into native part of Google analytics expect.
 */
export class ReactNativeGoogleAnaltyics {
  /**
   * Save all tracker related data that is needed to call native methods with proper data.
   * @param trackerId {String}
   * @param customDimensions {{fieldName: fieldIndex}} Custom dimensions field/index pairs
   */
  constructor(trackingId, customDimensions) {
    this.tracker = new GoogleAnalyticsTracker(trackingId, customDimensions);
  }

  /**
   * Provides a React Native target for Google Analytics
   * @param events {Object}
   */
  getTarget(events) {
    let optonal = {};
    this.events.forEach((event) => {
      switch(event.hitType) {
        case 'event':
          optional = getOptionals(event, ['eventLabel', 'eventValue']);
          this.tracker.trackEvent(event.eventCategory, event.eventAction, optional);
        break;

        case 'pageview':
          this.tracker.trackScreenView(event.page);
        break;

        case 'timing':
          optional = getOptionals(event, ['timingVar', 'timingLabel']);
          this.tracker.trackTiming(event.timingCategory, event.timingValue, optional);
        break;

        case 'social':
          this.tracker.trackSocialInteraction(event.socialNetwork, event.socialAction, event.socialTarget);
        break;

        case 'exception':
          this.tracker.trackException(event.exDescription, event.exFatal);
        break;

        default:
        break;
      }
    });
  };
}
