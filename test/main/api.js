const {
  createMiddleware,
  createMetaReducer,
} = require('../../src/main');

describe('API', () => {
  it('Exposes Redux Beacon correctly', () => {
    expect(createMiddleware).toBeDefined();
    expect(createMetaReducer).toBeDefined();
  });
});
