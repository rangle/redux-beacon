import { Target } from 'redux-beacon';

export function GoogleAnalytics(
  trackingId: string,
  GoogleAnalyticsTracker: any
): Target {
  const tracker = new GoogleAnalyticsTracker(trackingId);

  function target(events) {
    events.forEach(event => {
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

        case 'eventCustomDimensions': {
          const options = {};

          if (event.eventLabel !== undefined) {
            options.label = event.eventLabel;
          }
          if (event.eventValue !== undefined) {
            options.value = event.eventValue;
          }

          if (Object.keys(options).length > 0) {
            tracker.trackEventWithCustomDimensionValues(
              event.eventCategory,
              event.eventAction,
              options,
              event.customDimensionDict
            );
          } else {
            tracker.trackEventWithCustomDimensionValues(
              event.eventCategory,
              event.eventAction,
              {},
              event.customDimensionDict
            );
          }
          break;
        }

        case 'pageview': {
          tracker.trackScreenView(event.page);
          break;
        }

        case 'pageviewCustomDimensions': {
          tracker.trackScreenViewWithCustomDimensionValues(
            event.page,
            event.customDimensionDict
          );
          break;
        }

        case 'timing': {
          // timingVar is always required for timingLabel
          if (event.timingVar !== undefined) {
            const options = { name: event.timingVar };

            if (event.timingLabel !== undefined) {
              options.label = event.timingLabel;
            }

            tracker.trackTiming(
              event.timingCategory,
              event.timingValue,
              options
            );
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

        case 'user': {
          tracker.setUser(event.userId);
          break;
        }

        case 'client': {
          tracker.setClient(event.clientId);
          break;
        }

        case 'purchase': {
          const productOptions = {};
          const optionalProductOptions = [
            'category',
            'brand',
            'variant',
            'price',
            'quantity',
            'couponCode',
          ];

          const transactionOptions = {};
          const optionalTransactionOptions = [
            'affiliation',
            'revenue',
            'tax',
            'shipping',
            'couponCode',
          ];

          optionalProductOptions.forEach(option => {
            if (event.product[option] !== undefined) {
              productOptions[option] = event.product[option];
            }
          });

          optionalTransactionOptions.forEach(option => {
            if (event.transaction[option] !== undefined) {
              transactionOptions[option] = event.transaction[option];
            }
          });

          tracker.trackPurchaseEvent(
            {
              id: event.product.id, // required
              name: event.product.name, // required
              ...productOptions,
            },
            {
              id: event.transaction.id, // required
              ...transactionOptions,
            },
            event.eventCategory, // required
            event.eventAction // required
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
