import { PurgedEventsHandler } from '@redux-beacon/redux-beacon';
import fakeIndexedDB from 'fake-indexeddb';

import offlineWeb from '../';

describe.skip('offlineWeb', () => {
  window.indexedDB = fakeIndexedDB;

  test('saveEvents and purgeEvents integration', () => {
    const { saveEvents, purgeEvents } = offlineWeb(() => false);
    const events = [{ hitType: 'pageview', page: '/home' }];
    const expectedSavedEvent = {
      hitType: 'pageview',
      page: '/home',
      timeSaved: 1489163254030,
    };

    let oldEvents = [];
    const purgeEventCallback: PurgedEventsHandler = (purgedEvents) =>
      (oldEvents = purgedEvents);

    return saveEvents(events)
      .then(() => purgeEvents(purgeEventCallback))
      .then(() => {
        expect(Array.isArray(oldEvents)).toBe(true);
        expect(oldEvents.length).toBe(1);

        // TODO: write assertions once fake-indexeddb is ready
        // console.log(purgedEvents[0]);
        // console.log(expectedSavedEvent);
      });
  });
});
