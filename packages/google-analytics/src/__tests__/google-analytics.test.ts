import * as makeConsoleMock from 'consolemock';
import GoogleAnalytics from '../';

interface WindowWithGtag extends Window {
  ga: any;
}

declare var window: WindowWithGtag;

beforeAll(() => {
  console = (makeConsoleMock as any)(console);
});

beforeEach(() => {
  window.ga = undefined;
});

/* tslint:disable: no-console */
afterEach(() => {
  (console as any).clearHistory();
});

describe('GoogleAnalytics(events)', () => {
  it.only('calls window.ga("send", <event>) for each event', () => {
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

    const target = GoogleAnalytics();

    target(events);

    expect(window.ga).toHaveBeenCalledWith('send', events[0]);
    expect(window.ga).toHaveBeenCalledWith('send', events[1]);
  });

  describe('with events that have trackers', () => {
    it('calls window.ga("<tracker>:send", <event>) for each event', () => {
      const events = [
        {
          hitType: 'pageview',
          page: '/home',
          title: 'homepage',
          location: 'https://some.site/home',
          tracker: 'testHub',
        },
        {
          hitType: 'event',
          eventCategory: 'category',
          eventAction: 'action',
          eventLabel: 'label',
          eventValue: 'value',
          tracker: 'customApp',
        },
      ];

      window.ga = jest.fn();

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith(
        'testHub.set',
        'page',
        events[0].page
      );
      expect(window.ga).toHaveBeenCalledWith('testHub.send', events[0]);
      expect(window.ga).toHaveBeenCalledWith('customApp.send', events[1]);
    });
  });

  describe('with an event that has multiple trackers', () => {
    it('calls window.ga("<tracker>:send", <event>) for each event', () => {
      const events = [
        {
          hitType: 'pageview',
          page: '/home',
          title: 'homepage',
          location: 'https://some.site/home',
          tracker: ['testHub', 'customApp'],
        },
      ];

      window.ga = jest.fn();

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('testHub.send', events[0]);
      expect(window.ga).toHaveBeenCalledWith('customApp.send', events[0]);
    });
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

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('set', 'page', '/home');
    });

    it('does not pass along the customerTrackerId when used with an event-helper', () => {
      const events = [
        {
          hitType: 'pageview',
          customTrackerId: undefined,
          page: 'foo-page',
          title: 'foo-title',
          location: 'foo-location',
        },
      ];

      window.ga = jest.fn();

      const target = GoogleAnalytics();

      target(events);

      const hit = window.ga.mock.calls[1][1];

      expect(Object.keys(hit)).not.toContain('customTrackerId');
    });
  });

  describe('When window.ga is not defined', () => {
    it('does not throw an error', () => {
      window.ga = undefined;

      expect(() => GoogleAnalytics()).not.toThrow();
    });
    it('does nothing when events are pushed to the target', () => {
      window.ga = undefined;

      const events = [{ type: 'event', action: 'click' }];

      expect(() => GoogleAnalytics()(events)).not.toThrow();
    });
    it('logs an error informing the developer that no analytics are being tracked', () => {
      window.ga = undefined;

      GoogleAnalytics();

      expect((console as any).printHistory()).toMatchSnapshot();
    });
  });

  describe('when ga:ecommerce is being used', () => {
    beforeEach(() => {
      window.ga = jest.fn();
    });

    it('allows you to add an item to current cart state', () => {
      const itemId = 'fooitem';
      const itemName = 'Foo Item: Get your bar on';
      const events = [
        {
          hitType: 'addItem',
          id: itemId,
          name: itemName,
        },
      ];

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('ecommerce:addItem', {
        id: itemId,
        name: itemName,
      });
    });

    it('allows you to add a new transaction for a checkout', () => {
      const id = 'footransaction';
      const revenue = 523.33;
      const events = [
        {
          hitType: 'addTransaction',
          id,
          revenue,
        },
      ];

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('ecommerce:addTransaction', {
        id,
        revenue,
      });
    });

    it('allows you to create a clear event for the current cart state', () => {
      const events = [
        {
          hitType: 'ecommClear',
        },
      ];

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('ecommerce:clear');
    });

    it('creates an event using unique tracker id', () => {
      const customTrackerId = 'myCoolTracker';
      const id = 'myCoolId';
      const events = [
        {
          hitType: 'addTransaction',
          id,
          customTrackerId,
        },
      ];

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith(
        `${customTrackerId}.ecommerce:addTransaction`,
        {
          id,
        }
      );
    });

    it('sends current cart state when send is called', () => {
      const events = [
        {
          hitType: 'ecommSend',
        },
      ];

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('ecommerce:send');
    });
  });

  describe('when ga enhanced ecommerce is being used', () => {
    beforeEach(() => {
      window.ga = jest.fn() as any;
    });

    it('should call ecommerce events using enhanced prefix', () => {
      const events = [
        {
          hitType: 'ecommClear',
          ecommType: 'enhanced',
        },
      ];

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('ec:clear');
    });

    ['addProduct', 'addImpression', 'addPromo'].forEach(hitType => {
      test(`hitType ${hitType} should be handled by ecomm plugin`, () => {
        const events = [
          {
            hitType,
            ecommType: 'enhanced',
          },
        ];

        const target = GoogleAnalytics();

        target(events);

        expect(window.ga).toHaveBeenCalledWith(`ec:${hitType}`, {});
      });
    });

    it('should pass in action type to addAction call', () => {
      const events = [
        {
          hitType: 'addAction',
          ecommType: 'enhanced',
          actionName: 'click',
        },
      ];

      const target = GoogleAnalytics();

      target(events);

      expect(window.ga).toHaveBeenCalledWith('ec:setAction', 'click', {});
    });
  });
});
