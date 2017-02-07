const {
  createMiddleware,
  createMetaReducer,
  createEvents,
} = require('../../src/main');

describe('API', () => {
  it('Exposes Redux Beacon correctly', () => {
    expect(createMiddleware).toBeDefined();
    expect(createMetaReducer).toBeDefined();
    expect(createEvents).toBeDefined();
  });
});
