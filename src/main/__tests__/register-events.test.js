import registerEvents from '../register-events';

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

    expect(extensions.logger).toHaveBeenCalledWith(events, action, prevState);
  });
});

describe('When given an offline storage extension', () => {
  describe('If the app is offline', () => {
    const events = [{ event: 'some-event' }];
    const target = jest.fn();
    const prevState = { isConnected: true };
    const action = { type: 'SOME_ACTION_TYPE' };
    const nextState = { isConnected: false };
    const extensions = {
      logger: jest.fn(),
      offlineStorage: {
        saveEvents: jest.fn(),
        isConnected: state => state.isConnected,
      },
    };

    registerEvents(events, target, extensions, prevState, action, nextState);

    it('calls offlineStorage.saveEvents with the events', () => {
      expect(extensions.offlineStorage.saveEvents).toHaveBeenCalledWith(events);
    });
    it('does not push events to the target', () => {
      expect(target).not.toHaveBeenCalled();
    });
    it('logs events correctly', () => {
      expect(extensions.logger).toHaveBeenCalledWith(
        events,
        action,
        prevState,
        true,
        false
      );
    });
  });

  describe('If the app is offline and there is no events', () => {
    it('does not throw an error', () => {
      const events = [];
      const target = jest.fn();
      const prevState = { isConnected: true };
      const action = { type: 'SOME_ACTION_TYPE' };
      const nextState = { isConnected: false };
      const extensions = {
        logger: jest.fn(),
        offlineStorage: {
          saveEvents: jest.fn(),
          isConnected: state => state.isConnected,
        },
      };

      expect(() => {
        registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
      }).not.toThrow();
    });
  });

  describe('If the app is online (with events)', () => {
    const events = [{ event: 'some-event' }];
    const target = jest.fn();
    const prevState = { isConnected: false };
    const action = { type: 'SOME_ACTION_TYPE' };
    const nextState = { isConnected: true };
    const oldEvents = [{ event: 'some-old-event' }];
    const extensions = {
      logger: jest.fn(),
      offlineStorage: {
        purgeEvents: jest.fn(cb => cb(oldEvents)),
        saveEvents: jest.fn(),
        isConnected: state => state.isConnected,
      },
    };

    registerEvents(events, target, extensions, prevState, action, nextState);

    it('pushes the new events to the target', () => {
      expect(target).toHaveBeenCalledWith(events);
    });
    it('logs events correctly', () => {
      expect(extensions.logger).toHaveBeenCalledWith(events, action, prevState);
    });
    it('calls offlineStorage.purgeEvents', () => {
      expect(extensions.offlineStorage.purgeEvents).toHaveBeenCalled();
    });
    it('pushes the purged events to the target', () => {
      expect(target).toHaveBeenCalledWith(oldEvents);
    });
    it('logs the purged events', () => {
      expect(extensions.logger).toHaveBeenCalledWith(
        oldEvents,
        null,
        null,
        false,
        true
      );
    });
  });
  describe('If the app is online (without events)', () => {
    const events = [];
    const target = jest.fn();
    const prevState = { isConnected: false };
    const action = { type: 'SOME_ACTION_TYPE' };
    const nextState = { isConnected: true };
    const oldEvents = [{ event: 'some-old-event' }];
    const extensions = {
      logger: jest.fn(),
      offlineStorage: {
        purgeEvents: jest.fn(cb => cb(oldEvents)),
        saveEvents: jest.fn(),
        isConnected: state => state.isConnected,
      },
    };

    registerEvents(events, target, extensions, prevState, action, nextState);

    it('does not push any events to the target', () => {
      expect(target).not.toHaveBeenCalledWith([]);
    });
    it('logs events correctly', () => {
      expect(extensions.logger).toHaveBeenCalledWith([], action, prevState);
    });
    it('pushes the purged events to the target', () => {
      expect(target).toHaveBeenCalledWith(oldEvents);
    });
    it('logs the purged events', () => {
      expect(extensions.logger).toHaveBeenCalledWith(
        oldEvents,
        null,
        null,
        false,
        true
      );
    });
  });
});

describe('Asynchronous events', () => {
  describe('When given an array with an async event that returns one event', () => {
    it('pushes the event to the target once available', async () => {
      const events = [Promise.resolve({ event: 'some event' })];
      const target = jest.fn();

      await registerEvents(events, target);

      expect(target).toHaveBeenCalledWith([{ event: 'some event' }]);
    });
  });

  describe('When given an array with an async event that returns multiple events', () => {
    it('pushes the events to the target once available', async () => {
      const events = [
        Promise.resolve([
          { event: 'some event' },
          { event: 'some other event' },
        ]),
      ];
      const target = jest.fn();

      await registerEvents(events, target);

      expect(target).toHaveBeenCalledWith([
        { event: 'some event' },
        { event: 'some other event' },
      ]);
    });
  });

  describe('When given an array with some async events and some sync events', () => {
    const events = [
      { event: 'sync-event-1' },
      Promise.resolve({ event: 'async-event-1' }),
      { event: 'sync-event-2' },
      Promise.resolve([{ event: 'async-event-2' }, { event: 'async-event-3' }]),
    ];

    it('pushes the sync events immediately to the target', () => {
      const target = jest.fn();

      registerEvents(events, target);

      expect(target).toHaveBeenCalledWith([
        { event: 'sync-event-1' },
        { event: 'sync-event-2' },
      ]);
    });

    it('pushes the async events to the target once they are available', async () => {
      const target = jest.fn();

      await registerEvents(events, target);

      expect(target).toHaveBeenCalledWith([
        { event: 'async-event-1' },
        { event: 'async-event-2' },
        { event: 'async-event-3' },
      ]);
    });
  });

  describe('When given a logger extension', () => {
    describe('and an array with an async event that returns one event', () => {
      it('logs the event once available', async () => {
        const events = [Promise.resolve({ event: 'some event' })];
        const target = jest.fn();
        const action = { type: 'SOME_ACTION_TYPE' };
        const prevState = { route: '/home' };
        const extensions = {
          logger: jest.fn(),
        };

        await registerEvents(events, target, extensions, prevState, action);

        expect(extensions.logger).toHaveBeenCalledWith(
          [{ event: 'some event' }],
          action,
          prevState
        );
      });
    });

    describe('and an array with an async event that returns multiple events', () => {
      it('log the events once available', async () => {
        const events = [
          Promise.resolve([
            { event: 'some event' },
            { event: 'some other event' },
          ]),
        ];
        const target = jest.fn();
        const action = { type: 'SOME_ACTION_TYPE' };
        const prevState = { route: '/home' };
        const extensions = {
          logger: jest.fn(),
        };

        await registerEvents(events, target, extensions, prevState, action);

        expect(extensions.logger).toHaveBeenCalledWith(
          [{ event: 'some event' }, { event: 'some other event' }],
          action,
          prevState
        );
      });
    });

    describe('and an array with some async events and some sync events', () => {
      const events = [
        { event: 'sync-event-1' },
        Promise.resolve({ event: 'async-event-1' }),
        { event: 'sync-event-2' },
        Promise.resolve([
          { event: 'async-event-2' },
          { event: 'async-event-3' },
        ]),
      ];

      it('logs the sync event immediately', () => {
        const target = jest.fn();
        const action = { type: 'SOME_ACTION_TYPE' };
        const prevState = { route: '/home' };
        const extensions = {
          logger: jest.fn(),
        };

        registerEvents(events, target, extensions, prevState, action);

        expect(extensions.logger).toHaveBeenCalledWith(
          [{ event: 'sync-event-1' }, { event: 'sync-event-2' }],
          action,
          prevState
        );
      });

      it('logs the async events once they are available', async () => {
        const target = jest.fn();
        const action = { type: 'SOME_ACTION_TYPE' };
        const prevState = { route: '/home' };
        const extensions = {
          logger: jest.fn(),
        };

        await registerEvents(events, target, extensions, prevState, action);

        expect(extensions.logger).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('When given an offline storage extension', () => {
    describe('If the app is offline', () => {
      const events = [
        { event: 'sync-event-1' },
        Promise.resolve({ event: 'async-event-1' }),
        { event: 'sync-event-2' },
        Promise.resolve([
          { event: 'async-event-2' },
          { event: 'async-event-3' },
        ]),
      ];
      const target = jest.fn();
      const prevState = { isConnected: true };
      const action = { type: 'SOME_ACTION_TYPE' };
      const nextState = { isConnected: false };
      const oldEvents = [{ event: 'some-old-event' }];

      it('saves sync events immediately and async events once available', async () => {
        const extensions = {
          logger: jest.fn(),
          offlineStorage: {
            purgeEvents: jest.fn(cb => cb(oldEvents)),
            saveEvents: jest.fn(),
            isConnected: state => state.isConnected,
          },
        };
        await registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
        expect(extensions.offlineStorage.saveEvents.mock.calls).toEqual([
          [[{ event: 'sync-event-1' }, { event: 'sync-event-2' }]],
          [
            [
              { event: 'async-event-1' },
              { event: 'async-event-2' },
              { event: 'async-event-3' },
            ],
          ],
        ]);
      });

      it('does not push any events to the target', async () => {
        const extensions = {
          logger: jest.fn(),
          offlineStorage: {
            purgeEvents: jest.fn(cb => cb(oldEvents)),
            saveEvents: jest.fn(),
            isConnected: state => state.isConnected,
          },
        };
        await registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
        expect(target).not.toHaveBeenCalled();
      });

      it('logs events correctly', async () => {
        const extensions = {
          logger: jest.fn(),
          offlineStorage: {
            purgeEvents: jest.fn(cb => cb(oldEvents)),
            saveEvents: jest.fn(),
            isConnected: state => state.isConnected,
          },
        };
        await registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
        expect(extensions.logger.mock.calls).toEqual([
          [
            [{ event: 'sync-event-1' }, { event: 'sync-event-2' }],
            action,
            prevState,
            true,
            false,
          ],
          [
            [
              { event: 'async-event-1' },
              { event: 'async-event-2' },
              { event: 'async-event-3' },
            ],
            action,
            prevState,
            true,
            false,
          ],
        ]);
      });
    });

    describe('if the app is online', () => {
      const events = [
        { event: 'sync-event-1' },
        Promise.resolve({ event: 'async-event-1' }),
        { event: 'sync-event-2' },
        Promise.resolve([
          { event: 'async-event-2' },
          { event: 'async-event-3' },
        ]),
      ];
      const target = jest.fn();
      const prevState = { isConnected: false };
      const action = { type: 'SOME_ACTION_TYPE' };
      const nextState = { isConnected: true };
      const oldEvents = [{ event: 'some-old-event' }];

      it('pushes new sync events to the target synchronously', () => {
        const extensions = {
          logger: jest.fn(),
          offlineStorage: {
            purgeEvents: jest.fn(cb => cb(oldEvents)),
            saveEvents: jest.fn(),
            isConnected: state => state.isConnected,
          },
        };
        registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
        expect(target).toHaveBeenCalledWith([
          { event: 'sync-event-1' },
          { event: 'sync-event-2' },
        ]);
      });
      it('pushes new async event to the target once they are ready', async () => {
        const extensions = {
          logger: jest.fn(),
          offlineStorage: {
            purgeEvents: jest.fn(cb => cb(oldEvents)),
            saveEvents: jest.fn(),
            isConnected: state => state.isConnected,
          },
        };
        await registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
        expect(target).toHaveBeenCalledWith([
          { event: 'async-event-1' },
          { event: 'async-event-2' },
          { event: 'async-event-3' },
        ]);
      });
      it('pushes purged events to the target', () => {
        const extensions = {
          logger: jest.fn(),
          offlineStorage: {
            purgeEvents: jest.fn(cb => cb(oldEvents)),
            saveEvents: jest.fn(),
            isConnected: state => state.isConnected,
          },
        };
        registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
        expect(target).toHaveBeenCalledWith([{ event: 'some-old-event' }]);
      });
      it('logs events correctly', async () => {
        const extensions = {
          logger: jest.fn(),
          offlineStorage: {
            purgeEvents: jest.fn().mockImplementationOnce(cb => cb(oldEvents)),
            saveEvents: jest.fn(),
            isConnected: state => state.isConnected,
          },
        };
        await registerEvents(
          events,
          target,
          extensions,
          prevState,
          action,
          nextState
        );
        expect(extensions.logger.mock.calls).toEqual([
          [
            [{ event: 'sync-event-1' }, { event: 'sync-event-2' }],
            action,
            prevState,
          ],
          [[{ event: 'some-old-event' }], null, null, false, true],
          [
            [
              { event: 'async-event-1' },
              { event: 'async-event-2' },
              { event: 'async-event-3' },
            ],
            action,
            prevState,
          ],
        ]);
      });
    });
  });
});
