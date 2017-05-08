const { GoogleTagManager } = require('../google-tag-manager');

beforeEach(() => { window.dataLayer = undefined; });

describe('GoogleTagManager(events)', () => {
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

  describe('When dataLayer is not defined', () => {
    it('should throw an error informing the user.', () => {
      const events = [{ hitType: 'pageview' }];
      expect(() => GoogleTagManager(events)).toThrow('window.dataLayer is not defined. Have you forgotten to include Google Tag Manager and dataLayer?');
    });
  });
});
