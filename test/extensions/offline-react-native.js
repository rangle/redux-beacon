const fuzzyEqual = require('fuzzy-equal');
const { offlineReactNative } = require('../../src/extensions/offline-react-native');

describe('When saving events:', () => {
  it('calls AsyncStorage.setItem correctly', () => {
    const AsyncStorage = {
      getItem: () => Promise.resolve('[]'),
      setItem: jest.fn(() => Promise.resolve()),
    };
    const isConnected = () => {};
    const sampleEvent = { hitType: 'pageview', page: '/whatever' };

    const extension = offlineReactNative(AsyncStorage, isConnected);

    return extension.saveEvents([sampleEvent])
      .then(() => {
        const args = AsyncStorage.setItem.mock.calls[0];
        // first argument
        expect(args[0]).toBe('EventsStore');
        // second argument
        const savedEvent = JSON.parse(args[1])[0];
        const comparison = fuzzyEqual(sampleEvent, savedEvent);
        expect(comparison.common_properties).toEqual({ hitType: true, page: true });
        expect(comparison.right_only).toEqual(['timeSaved']);
      });
  });

  describe('When there are old events:', () => {
    it('saves the new events while preserving the old ones', () => {
      const sampleSavedEvent = {
        hitType: 'pageview',
        page: '/home',
        timeSaved: 'Wed Jan 18 2017 15:04:51 GMT-0500 (EST)',
      };
      const AsyncStorage = {
        getItem: () => Promise.resolve(JSON.stringify([sampleSavedEvent])),
        setItem: jest.fn(() => Promise.resolve()),
      };
      const isConnected = () => {};
      const sampleEvent = { hitType: 'pageview', page: '/whatever' };

      const extension = offlineReactNative(AsyncStorage, isConnected);

      return extension.saveEvents([sampleEvent])
        .then(() => {
          const args = AsyncStorage.setItem.mock.calls[0];
          const savedEvents = JSON.parse(args[1]);
          expect(savedEvents.length).toBe(2);
          expect(savedEvents[0]).toEqual(sampleSavedEvent);
        });
    });
  });
});
