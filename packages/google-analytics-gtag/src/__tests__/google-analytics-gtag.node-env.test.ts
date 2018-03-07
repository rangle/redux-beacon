/**
 * @jest-environment node
 */

import GoogleAnalyticsGtag from '../';

const target = GoogleAnalyticsGtag('GA_TRACKING_ID');

describe('If window does not exist', () => {
  it('should just silently not send events', () => {
    const events = [{ hitType: 'pageview' }];
    expect(() => target(events)).not.toThrow();
  });
});
