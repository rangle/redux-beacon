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
});
