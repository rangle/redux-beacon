const {
  GoogleAnalytics,
} = require('../../src/targets/google-analytics');

describe('Target: Google Analytics', () => {
  describe('GoogleAnalytics(ga)', () => {
    it('calls ga("send", <event>) for each event', () => {
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

      const ga = jest.fn();
      const target = new GoogleAnalytics(ga);
      target(events);

      expect(ga).toHaveBeenCalledWith('send', events[0]);
      expect(ga).toHaveBeenCalledWith('send', events[1]);
    });
  });
});
