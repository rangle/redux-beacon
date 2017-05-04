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

    describe('on a page view hit', () => {
      it('updates the tracker window.ga("set", "page", ...)', () => {
        const events = [
          {
            hitType: 'pageview',
            page: '/home',
          },
        ];

        window.ga = jest.fn();
        GoogleAnalytics(events);

        expect(window.ga).toHaveBeenCalledWith('set', 'page', '/home');
      });
    });

    describe('If window does not exist', () => {
      it('should just silently not send events', () => {
        const events = [{ hitType: 'pageview' }];
        expect(() => GoogleAnalytics(events)).not.toThrow();
      });
    });
  });
});
