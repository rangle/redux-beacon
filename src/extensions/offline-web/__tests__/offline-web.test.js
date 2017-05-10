const fakeIndexedDB = require('fake-indexeddb');
const fuzzyEqual = require('fuzzy-equal');

const { offlineWeb } = require('../offline-web');

describe('offlineWeb', () => {
  window.indexedDB = fakeIndexedDB;

  test('saveEvents and purgeEvents integration', () => {
    const { saveEvents, purgeEvents } = offlineWeb();
    const events = [{ hitType: 'pageview', page: '/home' }];
    const expectedSavedEvent = { hitType: 'pageview', page: '/home', timeSaved: 1489163254030 };

    return saveEvents(events)
      .then(() => purgeEvents(purgedEvents => purgedEvents))
      .then((purgedEvents) => {
        expect(Array.isArray(purgedEvents)).toBe(true);
        expect(purgedEvents.length).toBe(1);

        const comparison = fuzzyEqual(purgedEvents[0], expectedSavedEvent);
        expect(comparison.common_properties).toEqual({
          hitType: true,
          page: true,
          timeSaved: true,
        });
        expect(comparison.deep_differences.timeSaved.matching_types).toBe(true);
      });
  });
});
