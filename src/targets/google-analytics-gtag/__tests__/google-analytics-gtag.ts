import {
  GoogleAnalyticsGtag,
  PageView,
  Event,
} from '../';

import { Target } from '../../../../';


// GoogleAnalyticsGtag
let target: Target

target = GoogleAnalyticsGtag('GA_TRACKING_ID');

// typings:expect-error
target = GoogleAnalyticsGtag();

// PageView
let pageView;

pageView = (): PageView => ({
  type: 'page',
});

pageView = (): PageView => ({
  type: 'page',
  page_title: 'homepage',
  page_location: 'https://foo.com',
  page_path: '/home',
});

pageView = (): PageView => ({
  type: 'page',
  trackingId: 'some tracking id',
});

pageView = (): PageView => ({
  type: 'page',
  trackingId: ['id_1', 'id_2'],
});

// typings:expect-error
pageView = (): PageView => ({});

// typings:expect-error
pageView = (): PageView => ({
  foo: 'bar',
});

// typings:expect-error
pageView = (): PageView => ({
  type: 'page-view'
});

// Event
let event

event = (): Event => ({
  type: 'event',
  name: 'event_name',
});

event = (): Event => ({
  type: 'event',
  name: 'event_name',
  event_category: 'access',
  event_label: 'Google',
});

// typings:expect-error
event = (): Event => ({});

// typings:expect-error
event = (): Event => ({
  foo: 'bar',
});

// typings:expect-error
event = (): Event => ({
  type: 'lskdjf',
});
