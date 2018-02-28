/**
 * @jest-environment node
 */

import { GoogleAnalytics } from '../';

const target = GoogleAnalytics();

describe('If window does not exist', () => {
  it('should just silently not send events', () => {
    const events = [{ hitType: 'pageview' }];
    expect(() => target(events)).not.toThrow();
  });
});
