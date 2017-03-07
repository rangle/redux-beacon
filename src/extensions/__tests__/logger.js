const { logger } = require('../logger');
const { makeStrConsole } = require('../../utils/str-console');

beforeEach(() => {
  /* eslint-disable no-global-assign */
  console = makeStrConsole();
});

describe('happy path', () => {
  it('logs things', () => {
    const events = [{ hitType: 'pageview', page: '/' }];
    const action = { type: 'ROUTE_CHANGED', payload: '/' };
    logger(events, action);
    expect(console.getOutput()).toEqual(``);
  });
});
