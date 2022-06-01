import { PurgedEventsHandler } from '@redux-beacon/offline-react-native/dist/redux-beacon';
import offlineReactNative from '../';

describe('When saving events:', () => {
  it('calls AsyncStorage.setItem correctly', () => {
    const AsyncStorage = {
      getItem: () => Promise.resolve('[]'),
      setItem: jest.fn((key: string, value: any) => Promise.resolve()),
    };
    const isConnected = () => false;
    const sampleEvent = { hitType: 'pageview', page: '/whatever' };

    const extension = offlineReactNative(AsyncStorage, isConnected);

    return extension.saveEvents([sampleEvent]).then(() => {
      const args = AsyncStorage.setItem.mock.calls[0];
      // first argument
      expect(args[0]).toBe('EventsStore');
      // second argument
      const savedEvent = JSON.parse(args[1])[0];
      expect(savedEvent).toMatchObject(sampleEvent);
      expect(savedEvent).toHaveProperty('timeSaved');
    });
  });

  describe('When there are old events:', () => {
    it('saves the new events while preserving the old ones', () => {
      const sampleSavedEvent = {
        hitType: 'pageview',
        page: '/home',
        timeSaved: '1484858459226',
      };
      const AsyncStorage = {
        getItem: () => Promise.resolve(JSON.stringify([sampleSavedEvent])),
        setItem: jest.fn((key: string, events: any) => Promise.resolve()),
      };
      const isConnected = () => false;
      const sampleEvent = { hitType: 'pageview', page: '/whatever' };

      const extension = offlineReactNative(AsyncStorage, isConnected);

      return extension.saveEvents([sampleEvent]).then(() => {
        const args = AsyncStorage.setItem.mock.calls[0];
        const savedEvents = JSON.parse(args[1]);
        expect(savedEvents.length).toBe(2);
        expect(savedEvents[0]).toEqual(sampleSavedEvent);
      });
    });
  });

  describe('When purging events', () => {
    it('returns an empty array when there are no items to be purged', () => {
      const AsyncStorage = {
        getItem: () => Promise.resolve(null),
      };
      const isConnected = () => false;
      let oldEvents = [];
      const purgeEventCallback: PurgedEventsHandler = (purgedEvents) =>
        (oldEvents = purgedEvents);

      const extension = offlineReactNative(AsyncStorage, isConnected);

      return extension.purgeEvents(purgeEventCallback).then(() => {
        expect(Array.isArray(oldEvents)).toBe(true);
        expect(oldEvents.length).toBe(0);
      });
    });
    it('returns array of items when there are items to be purged', () => {
      const sampleEvent = { hitType: 'pageview', page: '/whatever' };
      const AsyncStorage = {
        getItem: () => Promise.resolve(JSON.stringify([sampleEvent])),
      };
      const isConnected = () => false;
      let oldEvents = [];
      const purgeEventCallback: PurgedEventsHandler = (purgedEvents) =>
        (oldEvents = purgedEvents);

      const extension = offlineReactNative(AsyncStorage, isConnected);

      return extension.purgeEvents(purgeEventCallback).then(() => {
        expect(Array.isArray(oldEvents)).toBe(true);
        expect(oldEvents.length).toBe(1);
        expect(oldEvents[0]).toEqual(sampleEvent);
      });
    });
  });
});
