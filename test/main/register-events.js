const registerEvents = require('../../src/main/register-events');

describe('registerEvents(events, target, extensions, prevState, action)', () => {
  describe('When given an array of events, and a target', () => {
    it('pushes events to the target', () => {
      const events = [{ event: 'some-event' }];
      const target = jest.fn();
      const extensions = {};
      const state = {};
      const action = {};

      registerEvents(events, target, extensions, state, action);

      expect(target).toHaveBeenCalledWith([{ event: 'some-event' }]);
    });
  });

  describe('When given an offline storage extension', () => {
    describe('If the app is offline', () => {
      const events = [{ event: 'some-event' }];
      const target = jest.fn();
      const extensions = {
        offlineStorage: {
          saveEvents: jest.fn(),
          isConnected: state => state.isConnected,
        },
      };
      const state = { isConnected: false };
      const action = {};

      registerEvents(events, target, extensions, state, action);

      it('calls offlineStorage.saveEvents with the events', () => {
        expect(extensions.offlineStorage.saveEvents).toHaveBeenCalledWith(events);
      });
      it('does not push events to the target', () => {
        expect(target).not.toHaveBeenCalled();
      });
    });

    describe('If the app is online', () => {
      const events = [{ event: 'some-event' }];
      const target = jest.fn();
      const extensions = {
        offlineStorage: {
          purgeEvents: jest.fn(),
          saveEvents: jest.fn(),
          isConnected: state => state.isConnected,
        },
      };
      const state = { isConnected: true };
      const action = {};

      registerEvents(events, target, extensions, state, action);

      it('pushes the new events to the data layer', () => {
        expect(target).toHaveBeenCalledWith(events);
      });

      it('calls offlineStorage.purgeEvents', () => {
        expect(extensions.offlineStorage.purgeEvents).toHaveBeenCalled();
      });
    });
  });
});
