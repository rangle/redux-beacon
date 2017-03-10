const { makeConsoleMock } = require('consolemock');
const { logger, getTimestamp } = require('../logger');

/* eslint-disable no-console */
describe('logger()', () => {
  beforeEach(() => {
    /* eslint-disable no-global-assign */
    console = makeConsoleMock();
  });

  Date.now = jest.fn(() => 1489105897006);
  // toTimeString will return the time in the machine's timezone.
  // The following stub ensures that the tests will work from any
  // timezone. This is especially needed to make the tests pass on
  // circle-ci.
  /* eslint-disable no-extend-native */
  Date.prototype.toTimeString = jest.fn(() => '19:31:37 GMT-0500 (EST)');

  const makeAction = () => ({ type: 'ROUTE_CHANGED', payload: '/home' });

  it('logs actions and any resulting analytics event', () => {
    const events = [{ hitType: 'pageview', page: '/home' }];
    const action = makeAction();
    logger(events, action);
    expect(console.printHistory()).toMatchSnapshot();
  });

  it('logs actions and any resulting analytics events', () => {
    const events = [
      { hitType: 'pageview', page: '/' },
      { hitType: 'pageview', page: '/home' },
    ];
    const action = makeAction();
    logger(events, action);
    expect(console.printHistory()).toMatchSnapshot();
  });

  it('logs events that are saved offline with a helpful message', () => {
    const events = [{ hitType: 'pageview', page: '/' }];
    const action = makeAction();
    logger(events, action, {}, true);
    expect(console.printHistory()).toMatchSnapshot();
  });

  it('logs events that were saved offline with a helpful message', () => {
    const events = [{ hitType: 'pageview', page: '/' }];
    const action = makeAction();
    logger(events, action, {}, false, true);
    expect(console.printHistory()).toMatchSnapshot();
  });

  it('logs nothing when there are no events', () => {
    const events = [];
    const action = makeAction();
    logger(events, action);
    expect(console.printHistory()).toMatchSnapshot();
  });
});

describe('getTimestamp(date)', () => {
  it('returns a timestamp', () => {
    expect(getTimestamp(1489105897606)).toEqual('19:31:37.606');
  });
});
