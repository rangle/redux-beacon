const { GoogleTagManager } = require('../../../src/targets/react-native/google-tag-manager');

describe('GoogleTagManager(trackingId, GTMBridge)', () => {
  describe('When given an array of events', () => {
    it('pushes those events to the data layer', () => {
      const trackingId = 'UX-XXXXXXX';
      const GTMBridge = {
        openContainerWithId: jest.fn(),
        pushDataLayerEvent: jest.fn(),
      };
      const events = [
        { event: 'some-event' },
        { event: 'some-other-event' },
      ];

      const target = GoogleTagManager(trackingId, GTMBridge);
      target(events);

      expect(GTMBridge.pushDataLayerEvent).toHaveBeenCalledWith(events[0]);
      expect(GTMBridge.pushDataLayerEvent).toHaveBeenCalledWith(events[1]);
    });
  });

  describe('When an event has a hitType property but no event property', () => {
    it('creates an event property and sets it to the hitType string', () => {
      const trackingId = 'UX-XXXXXXX';
      const GTMBridge = {
        openContainerWithId: jest.fn(),
        pushDataLayerEvent: jest.fn(),
      };
      const events = [{ hitType: 'pageview' }];

      const target = GoogleTagManager(trackingId, GTMBridge);
      target(events);

      const expected = {
        event: 'pageview',
        hitType: 'pageview',
      };
      expect(GTMBridge.pushDataLayerEvent).toHaveBeenCalledWith(expected);
    });
  });
});
