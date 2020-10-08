import * as makeConsoleMock from 'consolemock';
import GoogleTagManager from '../';

beforeAll(() => {
  console = makeConsoleMock(console);
});

beforeEach(() => {
  window.dataLayer = undefined;
  window.iAmADataLayer = undefined;
});

/* tslint:disable: no-console */
afterEach(() => {
  console.clearHistory();
});

describe('GoogleTagManager({...options})(events)', () => {
  describe('When given an array of events', () => {
    it('pushes those events to the data layer', () => {
      const events = [{ event: 'some-event' }, { event: 'some-other-event' }];

      window.dataLayer = { push: jest.fn() };
      GoogleTagManager()(events);

      expect(window.dataLayer.push).toHaveBeenCalledWith(events[0]);
      expect(window.dataLayer.push).toHaveBeenCalledWith(events[1]);
    });
  });

  describe('When given an event that is undefined', () => {
    it('does not throw an error', () => {
      const events = [undefined];

      window.dataLayer = { push: jest.fn() };

      expect(() => GoogleTagManager()(events)).not.toThrow();
    });
    it('does not push anything to the dataLayer', () => {
      const events = [undefined];

      window.dataLayer = { push: jest.fn() };
      GoogleTagManager()(events);

      expect(window.dataLayer.push).not.toHaveBeenCalled();
    });
  });

  describe('When options has dataLayerName: iAmADataLayer', () => {
    it('pushes events to iAmADataLayer data layer', () => {
      const options = {
        dataLayerName: 'iAmADataLayer',
      };
      const events = [{ event: 'some-event' }, { event: 'some-other-event' }];

      window[options.dataLayerName] = { push: jest.fn() };
      GoogleTagManager(options)(events);

      expect(window[options.dataLayerName].push).toHaveBeenCalledWith(
        events[0]
      );
      expect(window[options.dataLayerName].push).toHaveBeenCalledWith(
        events[1]
      );
    });
  });

  describe('When an event has a hitType property but no event property', () => {
    it('creates an event property and sets it to the hitType string', () => {
      const events = [{ hitType: 'pageview' }];

      window.dataLayer = { push: jest.fn() };
      GoogleTagManager()(events);

      const expected = {
        event: 'pageview',
      };
      expect(window.dataLayer.push).toHaveBeenCalledWith(expected);
    });
  });

  describe('When default dataLayer is not defined', () => {
    it('does not throw an error', () => {
      window.dataLayer = undefined;

      expect(() => GoogleTagManager()).not.toThrow();
    });
    it('does nothing when events are pushed to the target', () => {
      window.dataLayer = undefined;

      const events = [{ hitType: 'pageview' }];
      const target = GoogleTagManager();

      expect(() => target(events)).not.toThrow();
    });
    it('logs an error informing the developer that no events are being tracked', () => {
      window.dataLayer = undefined;

      const events = [{ hitType: 'pageview' }];
      GoogleTagManager()(events);

      expect(console.printHistory()).toMatchSnapshot();
    });
  });

  describe('When iAmADataLayer custom named dataLayer is not defined', () => {
    it('should log a warning to console informing the user.', () => {
      const options = {
        dataLayerName: 'iAmADataLayer',
      };
      const events = [{ hitType: 'pageview' }];
      expect(console.printHistory()).toMatchSnapshot();
    });
  });
});
