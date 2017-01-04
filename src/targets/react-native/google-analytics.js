function ReactNativeGoogleAnalytics(trackingId, GoogleAnalyticsTracker) {

  const tracker = new GoogleAnalyticsTracker(trackingId);

  function target(events) {
    events.forEach((event) => {
      switch (event.hitType) {
        case 'event': {
          if (event.eventLabel !== undefined) {
            const options = {
              label: event.eventLabel,
              value: event.eventValue
            };

            tracker.trackEvent(event.eventCategory, event.eventAction, options);
          } else {
            tracker.trackEvent(event.eventCategory, event.eventAction);
          }
          break;
        }

        case 'pageview': {
          tracker.trackScreenView(event.page);
          break;
        }

        case 'timing': {
          if (event.timingVar !== undefined) {
            const options = {
              name: event.timingVar,
              label: event.timingLabel
            };
            tracker.trackTiming(event.timingCategory, event.timingValue, options);
          } else {
            tracker.trackTiming(event.timingCategory, event.timingValue);
          }
          break;
        }

        case 'social': {
          tracker.trackSocialInteraction(
            event.socialNetwork,
            event.socialAction,
            event.socialTarget
          );
          break;
        }

        case 'exception': {
          tracker.trackException(event.exDescription, event.exFatal);
          break;
        }

        default:
      }
    });
  }

  return target;
}

module.exports = { ReactNativeGoogleAnalytics };