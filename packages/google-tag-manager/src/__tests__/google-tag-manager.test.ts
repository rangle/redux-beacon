import GoogleTagManager from '../';

beforeEach(() => {
  window.dataLayer = undefined;
  window.iAmADataLayer = undefined;
});

describe('GoogleTagManager({...options})(events)', () => {
  describe('When given an array of events', () => {
    it('pushes those events to the data layer', () => {
      const events = [{ event: 'some-event' }, { event: 'some-other-event' }, undefined];

      window.dataLayer = { push: jest.fn() };
      GoogleTagManager()(events);

      expect(window.dataLayer.push).toHaveBeenCalledWith(events[0]);
      expect(window.dataLayer.push).toHaveBeenCalledWith(events[1]);
      expect(window.dataLayer.push).not.toHaveBeenCalledWith(events[2]);
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
        hitType: 'pageview',
      };
      expect(window.dataLayer.push).toHaveBeenCalledWith(expected);
    });
  });

  describe('When default dataLayer is not defined', () => {
    it('should throw an error informing the user.', () => {
      const events = [{ hitType: 'pageview' }];
      expect(() => GoogleTagManager()(events)).toThrow(
        'window.dataLayer is not defined. Have you forgotten to include Google Tag Manager and dataLayer?'
      );
    });
  });

  describe('When iAmADataLayer custom named dataLayer is not defined', () => {
    it('should throw an error informing the user.', () => {
      const options = {
        dataLayerName: 'iAmADataLayer',
      };
      const events = [{ hitType: 'pageview' }];
      expect(() => GoogleTagManager(options)(events)).toThrow(
        'window.iAmADataLayer is not defined. Have you forgotten to include Google Tag Manager and dataLayer?'
      );
    });
  });
});
