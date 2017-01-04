const { ReactNativeGoogleAnalytics } = require('../../src/targets/react-native/google-analytics');

describe('Target: React Native Google Analytics', () => {

  describe('ReactNativeGoogleAnalytics(trackingId, trackerConstructor)', () => {
    it('creates GoogleAnalyticsTracker', () => {
      const trackerConstructor = jest.fn();
      const trackingId = 'UA-XXXXXX-Y';

      ReactNativeGoogleAnalytics(trackingId, trackerConstructor);

      expect(trackerConstructor).toHaveBeenCalledWith(trackingId);
    });

    it('calls trackEvent for event hitType', () => {
      const events = [
        {
          hitType: 'event',
          eventCategory: 'category',
          eventAction: 'action'
        },
      ];

      const tracker = {
        trackEvent: jest.fn(),
      };

      const trackingId = 'UA-XXXXXX-Y';
      const trackerConstructor = () => tracker;
      const RNGA = ReactNativeGoogleAnalytics(trackingId, trackerConstructor);
      RNGA(events);

      expect(tracker.trackEvent).toHaveBeenCalledWith(
        events[0].eventCategory,
        events[0].eventAction
      );
    });

    it('calls trackEvent for event hitType with optional values', () => {
      const events = [
        {
          hitType: 'event',
          eventCategory: 'category',
          eventAction: 'action',
          eventLabel: 'label', // option
          eventValue: 2017, // option
        },
      ];

      const tracker = {
        trackEvent: jest.fn(),
      };

      const trackingId = 'UA-XXXXXX-Y';
      const trackerConstructor = () => tracker;
      const RNGA = ReactNativeGoogleAnalytics(trackingId, trackerConstructor);
      RNGA(events);

      const options = {
        label: 'label',
        value: 2017,
      };

      expect(tracker.trackEvent).toHaveBeenCalledWith(
        events[0].eventCategory,
        events[0].eventAction,
        options
      );
    });

    it('calls trackScreenView for pageview hitType', () => {
      const events = [
        {
          hitType: 'pageview',
          page: '/home'
        },
      ];

      const tracker = {
        trackScreenView: jest.fn(),
      };

      const trackingId = 'UA-XXXXXX-Y';
      const trackerConstructor = () => tracker;
      const RNGA = ReactNativeGoogleAnalytics(trackingId, trackerConstructor);
      RNGA(events);

      expect(tracker.trackScreenView).toHaveBeenCalledWith(events[0].page);
    });

    it('calls trackTiming for timing hitType', () => {
      const events = [
        {
          hitType: 'timing',
          timingCategory: 'category',
          timingValue: 123,
        },
      ];

      const tracker = {
        trackTiming: jest.fn(),
      };

      const trackingId = 'UA-XXXXXX-Y';
      const trackerConstructor = () => tracker;
      const RNGA = ReactNativeGoogleAnalytics(trackingId, trackerConstructor);
      RNGA(events);

      expect(tracker.trackTiming).toHaveBeenCalledWith(
        events[0].timingCategory,
        events[0].timingValue
      );
    });

    it('calls trackTiming for timing hitType with optional values', () => {
      const events = [
        {
          hitType: 'timing',
          timingCategory: 'category',
          timingVar: 'variable',
          timingValue: 123,
          timingLabel: 'label',
        },
      ];

      const tracker = {
        trackTiming: jest.fn(),
      };

      const trackingId = 'UA-XXXXXX-Y';
      const trackerConstructor = () => tracker;
      const RNGA = ReactNativeGoogleAnalytics(trackingId, trackerConstructor);
      RNGA(events);

      const options = {
        name: 'variable',
        label: 'label',
      };

      expect(tracker.trackTiming).toHaveBeenCalledWith(
        events[0].timingCategory,
        events[0].timingValue,
        options
      );
    });

    it('calls trackSocialInteraction for social hitType', () => {
      const events = [
        {
          hitType: 'social',
          socialNetwork: 'network',
          socialAction: 'action',
          socialTarget: 'target',
        },
      ];

      const tracker = {
        trackSocialInteraction: jest.fn(),
      };

      const trackingId = 'UA-XXXXXX-Y';
      const trackerConstructor = () => tracker;
      const RNGA = ReactNativeGoogleAnalytics(trackingId, trackerConstructor);
      RNGA(events);

      expect(tracker.trackSocialInteraction).toHaveBeenCalledWith(
        events[0].socialNetwork,
        events[0].socialAction,
        events[0].socialTarget
      );
    });


    it('calls trackException for exception hitType', () => {
      const events = [
        {
          hitType: 'exception',
          exDescription: 'description',
          exFatal: true,
        },
      ];

      const tracker = {
        trackException: jest.fn(),
      };

      const trackingId = 'UA-XXXXXX-Y';
      const trackerConstructor = () => tracker;
      const RNGA = ReactNativeGoogleAnalytics(trackingId, trackerConstructor);
      RNGA(events);

      expect(tracker.trackException).toHaveBeenCalledWith(
        events[0].exDescription,
        events[0].exFatal,
      );
    });
  });
});
