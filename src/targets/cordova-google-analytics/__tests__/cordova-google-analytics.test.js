const { CordovaGoogleAnalytics } = require('../');

describe('Target: Cordova Google Analytics', () => {
  beforeEach(() => {
    window.ga = undefined;
  });
  describe('CordovaGoogleAnalytics(events)', () => {
    it('calls window.ga.trackEvent(<event>) for each event', () => {
      const events = [
        {
          hitType: 'event',
          eventCategory: 'category1',
          eventAction: 'action1',
          eventLabel: 'label1',
          eventValue: 'value1',
        },
        {
          hitType: 'event',
          eventCategory: 'category2',
          eventAction: 'action2',
          eventLabel: 'label2',
          eventValue: 'value2',
        },
      ];

      window.ga = { trackEvent: jest.fn() };
      CordovaGoogleAnalytics(events);

      expect(window.ga.trackEvent).toHaveBeenCalledWith(
        events[0].eventCategory, events[0].eventAction, events[0].eventLabel, events[0].eventValue
      );
      expect(window.ga.trackEvent).toHaveBeenCalledWith(
        events[1].eventCategory, events[1].eventAction, events[1].eventLabel, events[1].eventValue
      );
    });
    describe('on a page view hit', () => {
      it('updates the tracker window.ga.trackView("set", "page", ...)', () => {
        const events = [
          {
            hitType: 'pageview',
            page: 'home',
          },
          {
            hitType: 'pageview',
            page: 'home',
            location: 'my-scheme://content/1111?utm_source=google&utm_campaign=my-campaign',
          },
          {
            hitType: 'pageview',
            page: 'home',
            location: 'my-scheme://content/1111?utm_source=google&utm_campaign=my-campaign',
            newSession: true,
          },
        ];

        window.ga = { trackView: jest.fn() };
        CordovaGoogleAnalytics(events);

        expect(window.ga.trackView).toHaveBeenCalledWith(events[0].page, undefined, undefined);
        expect(window.ga.trackView).toHaveBeenCalledWith(
          events[1].page, events[1].location, undefined
        );
        expect(window.ga.trackView).toHaveBeenCalledWith(
          events[2].page, events[2].location, events[2].newSession
        );
      });
    });
  });
});
