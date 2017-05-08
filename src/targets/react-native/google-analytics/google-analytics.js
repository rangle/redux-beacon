function GoogleAnalytics(trackingId, GoogleAnalyticsTracker) {
  const tracker = new GoogleAnalyticsTracker(trackingId);

  function target(events) {
    events.forEach((event) => {
      switch (event.hitType) {
        case 'event': {
          const options = {};

          if (event.eventLabel !== undefined) {
            options.label = event.eventLabel;
          }
          if (event.eventValue !== undefined) {
            options.value = event.eventValue;
          }

          if (Object.keys(options).length > 0) {
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
          // timingVar is always required for timingLabel
          if (event.timingVar !== undefined) {
            const options = { name: event.timingVar };

            if (event.timingLabel !== undefined) {
              options.label = event.timingLabel;
            }

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

module.exports = { GoogleAnalytics };
