import { GoogleAnalyticsGtag } from '../';

beforeEach(() => {
  window.gtag = jest.fn();
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
      {},
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

describe('When window.gtag is not defined', () => {
  it('throws an error informing the developer', () => {
    window.gtag = undefined;

    expect(() => GoogleAnalyticsGtag('GA_TRACKING_ID')).toThrow();
  });
});
