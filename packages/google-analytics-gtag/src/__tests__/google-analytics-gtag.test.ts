import * as makeConsoleMock from 'consolemock';
import GoogleAnalyticsGtag from '../';
import { trackEvent, trackPageView } from '../event-helpers';

interface WindowWithGtag extends Window {
  gtag: any;
}

declare const window: WindowWithGtag;

interface Console {
  group: any;
  groupEnd: any;
  clearHistory(): void;
  printHistory(): void;
}

declare let console: Console;

beforeAll(() => {
  console = (makeConsoleMock as any)(console);
});

beforeEach(() => {
  window.gtag = jest.fn();
});

/* tslint:disable: no-console */
afterEach(() => {
  console.clearHistory();
});

it('configures the Google Analytics property with the tracking ID', () => {
  GoogleAnalyticsGtag('GA_TRACKING_ID');
  expect(window.gtag).toHaveBeenCalledWith('config', 'GA_TRACKING_ID', {
    send_page_view: false,
  });
});

describe('Page Tracking', () => {
  test('given { type: "page" }', () => {
    const events = [{ type: 'page' }];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    target(events);

    expect(window.gtag).toHaveBeenCalledWith('config', 'GA_TRACKING_ID', {});
  });

  test('given { type: "page", page_title, page_location, page_path }', () => {
    const events = [
      {
        type: 'page',
        page_title: 'page title',
        page_location: 'page location',
        page_path: 'page path',
      },
    ];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    target(events);

    expect(window.gtag).toHaveBeenCalledWith('config', 'GA_TRACKING_ID', {
      page_title: 'page title',
      page_location: 'page location',
      page_path: 'page path',
    });
  });

  test('given { type: "page", trackingId: string }', () => {
    const events = [
      {
        type: 'page',
        trackingId: 'SOME_OTHER_GA_TRACKING_ID',
      },
    ];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    target(events);

    expect(window.gtag).toHaveBeenCalledWith(
      'config',
      'SOME_OTHER_GA_TRACKING_ID',
      {}
    );
  });

  test('given { type: "page", trackingId: Array<string> }', () => {
    const events = [
      {
        type: 'page',
        trackingId: ['GA_TRACKING_ID', 'GA_TRACKING_ID_1', 'GA_TRACKING_ID_2'],
      },
    ];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    target(events);

    expect(window.gtag).toHaveBeenCalledWith('config', 'GA_TRACKING_ID', {});
    expect(window.gtag).toHaveBeenCalledWith('config', 'GA_TRACKING_ID_1', {});
    expect(window.gtag).toHaveBeenCalledWith('config', 'GA_TRACKING_ID_2', {});
  });

  test('given { type: "page", trackingId: [] } (empty trackPageView)', () => {
    const events = [
      {
        type: 'page',
        trackingId: [],
        page_path: '/topics',
      },
    ];

    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    target(events);

    expect(window.gtag).toHaveBeenCalledWith('config', 'GA_TRACKING_ID', {
      page_path: '/topics',
    });
  });

  describe('When you pass the target a pageView with a fieldsObject', () => {
    it('includes the properties in the fieldsObject in the gtag event hit', () => {
      const events = [
        trackPageView(() => ({
          title: 'event-title',
          location: 'event-location',
          path: 'event-path',
          fieldsObject: {
            dimension1: 'dimension1',
            metric1: 'metric1',
          },
        }))(null, null, null),
      ];

      const target = GoogleAnalyticsGtag('GA_TRACKING_ID');
      target(events);

      expect(window.gtag.mock.calls[1][2]).toMatchObject({
        dimension1: 'dimension1',
        metric1: 'metric1',
      });
    });
  });
});

describe('Event Tracking', () => {
  test('given { type: "event", action: "click" }', () => {
    const events = [{ type: 'event', action: 'click' }];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    target(events);

    expect(window.gtag).toHaveBeenCalledWith('event', 'click', {});
  });

  test('given { type: "event", action: "click", ...event_props }', () => {
    const events = [
      {
        type: 'event',
        action: 'click',
        event_category: 'engagement',
        event_action: 'login',
        event_label: 'article',
        value: 42,
      },
    ];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    target(events);

    expect(window.gtag).toHaveBeenCalledWith('event', 'click', {
      event_category: 'engagement',
      event_action: 'login',
      event_label: 'article',
      value: 42,
    });
  });
});

describe('Undefined Event Type', () => {
  test('given {}', () => {
    const events = [{}];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');
    window.gtag.mockReset();

    target(events);

    expect(window.gtag).not.toHaveBeenCalled();
  });
  test('given { type: "skdjf" }', () => {
    const events = [{ type: 'lskdjf' }];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');
    window.gtag.mockReset();

    target(events);

    expect(window.gtag).not.toHaveBeenCalled();
  });
});

describe('When you pass the target an event with a fieldsObject', () => {
  it('includes the properties in the fieldsObject in the gtag event hit', () => {
    const events = [
      trackEvent(() => ({
        category: 'event-category',
        action: 'event-action',
        label: 'event-label',
        value: 0,
        fieldsObject: {
          dimension1: 'dimension1',
          metric1: 'metric1',
        },
      }))(null, null, null),
    ];

    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');
    target(events);

    expect(window.gtag.mock.calls[1][2]).toMatchObject({
      dimension1: 'dimension1',
      metric1: 'metric1',
    });
  });
});

describe('When window.gtag is not defined', () => {
  it('does not throw an error', () => {
    window.gtag = undefined;

    expect(() => GoogleAnalyticsGtag('GA_TRACKING_ID')).not.toThrow();
  });
  it('does nothing when events are pushed to the target', () => {
    window.gtag = undefined;

    const events = [{ type: 'event', action: 'click' }];
    const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

    expect(() => target(events)).not.toThrow();
  });
  it('logs an error informing the developer that no analytics are being tracked', () => {
    window.gtag = undefined;

    GoogleAnalyticsGtag('GA_TRACKING_ID');

    expect(console.printHistory()).toMatchSnapshot();
  });
});
