const { ReactNativeGoogleTagManager } = require('../../../src/targets/react-native/google-tag-manager');

describe('Target: React Native GoogleTagManager', () => {
  describe('When given an array of events', () => {
    it('pushes those events to the data layer', () => {
      const events = [
        { event: 'some-event' },
        { event: 'some-other-event' },
      ];

      const googleTagManager = {
        pushDataLayerEvent: jest.fn(),
      };
      ReactNativeGoogleTagManager(events, googleTagManager);

      expect(googleTagManager.pushDataLayerEvent).toHaveBeenCalledWith(events[0]);
      expect(googleTagManager.pushDataLayerEvent).toHaveBeenCalledWith(events[1]);
    });
  });

  describe('When an event has a hitType property but no event property', () => {
    it('creates an event property and sets it to the hitType string', () => {
      const events = [{ hitType: 'pageview' }];

      const googleTagManager = {
        pushDataLayerEvent: jest.fn(),
      };
      ReactNativeGoogleTagManager(events, googleTagManager);

      const expected = {
        event: 'pageview',
        hitType: 'pageview',
      };
      expect(googleTagManager.pushDataLayerEvent).toHaveBeenCalledWith(expected);
    });
  });
});
