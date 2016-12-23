const { GoogleTagManager } = require('../../src/targets/google-tag-manager');

describe('Target: GoogleTagManager', () => {
  beforeEach(() => {
    window.dataLayer = undefined;
  });

  describe('When given an array of events', () => {
    it('pushes those events to the data layer', () => {
      const events = [
        { event: 'some-event' },
        { event: 'some-other-event' },
      ];

      window.dataLayer = { push: jest.fn() };
      GoogleTagManager(events);

      expect(window.dataLayer.push).toHaveBeenCalledWith(events[0]);
      expect(window.dataLayer.push).toHaveBeenCalledWith(events[1]);
    });
  });

  describe('When an event has a hitType property but no event property', () => {
    it('creates an event property and sets it to the hitType string', () => {
      const events = [{ hitType: 'pageview' }];

      window.dataLayer = { push: jest.fn() };
      GoogleTagManager(events);

      const expected = {
        event: 'pageview',
        hitType: 'pageview',
      };
      expect(window.dataLayer.push).toHaveBeenCalledWith(expected);
    });
  });
});
