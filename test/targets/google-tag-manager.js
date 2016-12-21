const { GoogleTagManager } = require('../../src/targets/google-tag-manager');

describe('Target: GoogleTagManager', () => {
  describe('When given an array of events', () => {
    it('pushes those events to the data layer', () => {
      const events = [
        { event: 'some-event' },
        { event: 'some-other-event' },
      ];

      const dataLayer = { push: jest.fn() };
      const target = new GoogleTagManager(dataLayer);
      target(events);

      expect(dataLayer.push).toHaveBeenCalledWith(events[0]);
      expect(dataLayer.push).toHaveBeenCalledWith(events[1]);
    });
  });
});
