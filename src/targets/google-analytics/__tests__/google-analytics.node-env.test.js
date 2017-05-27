/**
 * @jest-environment node
 */

const { GoogleAnalytics } = require('../google-analytics');

describe('If window does not exist', () => {
  it('should just silently not send events', () => {
    const events = [{ hitType: 'pageview' }];
    expect(() => GoogleAnalytics(events)).not.toThrow();
  });
});
