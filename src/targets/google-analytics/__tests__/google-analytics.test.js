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

      GoogleAnalytics(events);

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

      GoogleAnalytics(events);
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

      GoogleAnalytics(events);
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

      GoogleAnalytics(events);
      expect(window.ga).toHaveBeenCalledWith(`${customTrackerId}.ecommerce:addTransaction`, { id });
    });

    it('sends current cart state when send is called', () => {
      const events = [
        {
          hitType: 'ecommSend',
        },
      ];

      GoogleAnalytics(events);
      expect(window.ga).toHaveBeenCalledWith('ecommerce:send');
    });
  });
});
