const { GoogleAnalytics } = require('../');

beforeEach(() => { window.ga = undefined; });

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

  describe('When ga is not defined', () => {
    it('should throw an error informing the user.', () => {
      const events = [
        {
          hitType: 'pageview',
          page: '/home',
        },
      ];
      expect(() => GoogleAnalytics(events)).toThrow('window.ga is not defined, Have you forgotten to include Google Analytics?');
    });
  });
});
