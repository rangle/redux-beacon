/**
 * @jest-environment node
 */

const { GoogleTagManager } = require('../');

describe('If window does not exist', () => {
  it('should just silently not send events', () => {
    const events = [{ hitType: 'pageview' }];
    expect(() => GoogleTagManager()(events)).not.toThrow();
  });
});
