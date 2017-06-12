const registerEvents = require('../register-events');

describe('registerEvents()', () => {
  describe('When given an array of events, and a target', () => {
    it('pushes events to the target', () => {
      const events = [{ event: 'some-event' }];
      const target = jest.fn();

      registerEvents(events, target);

      expect(target).toHaveBeenCalledWith([{ event: 'some-event' }]);
    });
  });

  describe('When given a logger extension', () => {
    it('logs the events', () => {
      const events = [{ event: 'some-event' }];
      const target = jest.fn();
      const action = { type: 'SOME_ACTION_TYPE' };
      const prevState = { route: '/home' };
      const extensions = {
        logger: jest.fn(),
      };

      registerEvents(events, target, extensions, prevState, action);

      expect(extensions.logger)
        .toHaveBeenCalledWith(events, action, prevState);
    });
  });

  describe('When given an offline storage extension', () => {
    describe('If the app is offline', () => {
      const events = [{ event: 'some-event' }];
      const target = jest.fn();
      const prevState = { isConnected: false };
      const action = { type: 'SOME_ACTION_TYPE' };
      const extensions = {
        logger: jest.fn(),
        offlineStorage: {
          saveEvents: jest.fn(),
          isConnected: state => state.isConnected,
        },
      };

      registerEvents(events, target, extensions, prevState, action);

      it('calls offlineStorage.saveEvents with the events', () => {
        expect(extensions.offlineStorage.saveEvents).toHaveBeenCalledWith(events);
      });
      it('does not push events to the target', () => {
        expect(target).not.toHaveBeenCalled();
      });
      it('logs events correctly', () => {
        expect(extensions.logger)
          .toHaveBeenCalledWith(events, action, prevState, true, false);
      });
    });

    describe('If the app is online', () => {
      const events = [{ event: 'some-event' }];
      const target = jest.fn();
      const prevState = { isConnected: true };
      const action = { type: 'SOME_ACTION_TYPE' };
      const oldEvents = [{ event: 'some-old-event' }];
      const extensions = {
        logger: jest.fn(),
        offlineStorage: {
          purgeEvents: jest.fn(cb => cb(oldEvents)),
          saveEvents: jest.fn(),
          isConnected: state => state.isConnected,
        },
      };

      registerEvents(events, target, extensions, prevState, action);

      it('pushes the new events to the target', () => {
        expect(target).toHaveBeenCalledWith(events);
      });
      it('logs events correctly', () => {
        expect(extensions.logger)
          .toHaveBeenCalledWith(events, action, prevState);
      });
      it('calls offlineStorage.purgeEvents', () => {
        expect(extensions.offlineStorage.purgeEvents).toHaveBeenCalled();
      });
      it('pushes the purged events to the target', () => {
        expect(target).toHaveBeenCalledWith(oldEvents);
      });
      it('logs the purged events', () => {
        expect(extensions.logger)
          .toHaveBeenCalledWith(oldEvents, null, null, false, true);
      });
    });
  });
});
