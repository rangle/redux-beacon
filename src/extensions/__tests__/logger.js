const { logger } = require('../logger');
const { makeStrConsole } = require('../../utils/str-console');

beforeEach(() => {
  /* eslint-disable no-global-assign */
  console = makeStrConsole();
});

const makeAction = () => ({ type: 'ROUTE_CHANGED', payload: '/' });

/* eslint-disable no-console */
describe('logger()', () => {
  it('logs actions and any resulting analytics event', () => {
    const events = [{ hitType: 'pageview', page: '/' }];
    const action = makeAction();
    logger(events, action);
    const output = console.getOutput();
    expect(output).toMatchSnapshot();
  });

  it('logs actions and any resulting analytics events', () => {
    const events = [
      { hitType: 'pageview', page: '/' },
      { hitType: 'pageview', page: '/home' },
    ];
    const action = makeAction();
    logger(events, action);
    const output = console.getOutput();
    expect(output).toMatchSnapshot();
  });

  it('logs events that are saved offline with a helpful message', () => {
    const events = [{ hitType: 'pageview', page: '/' }];
    const action = makeAction();
    logger(events, action, {}, true);
    const output = console.getOutput();
    expect(output).toMatchSnapshot();
  });

  it('logs events that were saved offline with a helpful message', () => {
    const events = [{ hitType: 'pageview', page: '/' }];
    const action = makeAction();
    logger(events, action, {}, false, true);
    const output = console.getOutput();
    expect(output).toMatchSnapshot();
  });

  it('logs nothing when there are no events', () => {
    const events = [];
    const action = makeAction();
    logger(events, action);
    const output = console.getOutput();
    expect(output).toMatchSnapshot();
  });
});
