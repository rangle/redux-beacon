const {
  GoogleAnalytics,
} = require('../../src/targets/google-analytics');

describe('Target: Google Analytics', () => {
  beforeEach(() => {
    window.ga = undefined;
  });
  describe('GoogleAnalytics(events)', () => {
    it('calls window.ga("send", <event>) for each event', () => {
      const events = [
        {
          hitType: 'pageview',
          page: '/home',
          title: 'homepage',
          location: 'https://some.site/home',
        },
        {
          hitType: 'event',
          eventCategory: 'category',
          eventAction: 'action',
          eventLabel: 'label',
          eventValue: 'value',
        },
      ];

      window.ga = jest.fn();
      GoogleAnalytics(events);

      expect(window.ga).toHaveBeenCalledWith('send', events[0]);
      expect(window.ga).toHaveBeenCalledWith('send', events[1]);
    });
  });
});
