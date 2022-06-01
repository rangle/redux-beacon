import * as makeConsoleMock from 'consolemock';
import logger, { getTimestamp } from '../logger';

interface Console {
  group: any;
  groupEnd: any;
  clearHistory(): void;
  printHistory(): void;
}

declare let console: Console;

beforeAll(() => {
  console = (makeConsoleMock as any)(console);
});

/* tslint:disable: no-console */
afterEach(() => {
  console.clearHistory();
});

Date.now = jest.fn(() => 1489105897006);
// toTimeString will return the time in the machine's timezone.
// The following stub ensures that the tests will work from any
// timezone. This is especially needed to make the tests pass on
// circle-ci.
/* eslint-disable no-extend-native */
Date.prototype.toTimeString = jest.fn(() => '19:31:37 GMT-0500 (EST)');

const makeAction = () => ({ type: 'ROUTE_CHANGED', payload: '/home' });

it('1. logs actions and any resulting analytics event', () => {
  const events = [{ hitType: 'pageview', page: '/home' }];
  const action = makeAction();
  logger(events, action, {});
  expect(console.printHistory()).toMatchSnapshot();
});

it('2. logs actions and any resulting analytics events', () => {
  const events = [
    { hitType: 'pageview', page: '/' },
    { hitType: 'pageview', page: '/home' },
  ];
  const action = makeAction();
  logger(events, action, {});
  expect(console.printHistory()).toMatchSnapshot();
});

it('3. logs events that are saved offline with a helpful message', () => {
  const events = [{ hitType: 'pageview', page: '/' }];
  const action = makeAction();
  logger(events, action, {}, true);
  expect(console.printHistory()).toMatchSnapshot();
});

it('4. logs events that were saved offline with a helpful message', () => {
  const events = [{ hitType: 'pageview', page: '/' }];
  logger(events, null, null, false, true);
  expect(console.printHistory()).toMatchSnapshot();
});

it('5. logs nothing when there are no events', () => {
  const events = [];
  const action = makeAction();
  logger(events, action, {});
  expect(console.printHistory()).toMatchSnapshot();
});

it('6. logs events correctly even if console.group is undefined (RN)', () => {
  console.group = undefined;
  console.groupEnd = undefined;

  const events = [
    { hitType: 'pageview', page: '/' },
    { hitType: 'pageview', page: '/home' },
  ];

  const action = makeAction();
  logger(events, action, {});
  expect(console.printHistory()).toMatchSnapshot();
});

describe('getTimestamp(date)', () => {
  it('returns a timestamp', () => {
    expect(getTimestamp(1489105897606)).toEqual('19:31:37.606');
  });
});
