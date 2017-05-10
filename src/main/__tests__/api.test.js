const {
  createMiddleware,
  createMetaReducer,
  createEvents,
} = require('../');

describe('API', () => {
  it('Exposes Redux Beacon correctly', () => {
    expect(createMiddleware).toBeDefined();
    expect(createMetaReducer).toBeDefined();
    expect(createEvents).toBeDefined();
  });
});
