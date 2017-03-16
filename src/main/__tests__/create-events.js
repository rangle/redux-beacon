const createEvents = require('../create-events');

describe('createEvents(eventDefinitions, prevState, action)', () => {
  describe('When the event definition is an empty object', () => {
    it('returns an empty array', () => {
      const eventDefinitions = {};
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When the event definition is an empty array', () => {
    it('returns an empty array', () => {
      const eventDefinitions = [];
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When the event definition has an eventFields method', () => {
    it('calls eventFields with (action, prevState)', () => {
      const eventDefinitions = { eventFields: jest.fn() };
      const prevState = { prop1: 'value1', prop2: 'value2' };
      const action = { type: 'SOME_ACTION_TYPE' };

      createEvents(eventDefinitions, prevState, action);
      expect(eventDefinitions.eventFields).toHaveBeenCalledWith(action, prevState);
    });
    it('takes whatever is returned by eventFields as the new event', () => {
      const eventDefinitions = { eventFields: () => ({ prop: 'value 1' }) };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [{ prop: 'value 1' }];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When the event definition has an eventSchema property', () => {
    it('returns the event if it matches the schema', () => {
      const eventDefinitions = {
        eventFields() {
          return { route: '/login' };
        },
        eventSchema: {
          route: value => value !== '/my-account',
        },
      };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [{ route: '/login' }];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
    it('does not return the event if it does not match the schema', () => {
      const eventDefinitions = {
        eventFields() {
          return { route: '/my-account' };
        },
        eventSchema: {
          route: value => value !== '/my-account',
        },
      };
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = [];
      const actual = createEvents(eventDefinitions, prevState, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('When an array of event definitions is provided', () => {
    it('creates an event for each event definition', () => {
      const event1 = { eventFields: () => ({ hitType: 'pageview' }) };
      const event2 = { eventFields: () => ({ hitType: 'event' }) };
      const event3 = { eventFields: () => ({ hitType: 'timing' }) };
      const eventDefinitions = [event1, event2, event3];
      const prevState = {};
      const action = { type: 'SOME_ACTION_TYPE' };

      const expected = 3;
      const actual = createEvents(eventDefinitions, prevState, action).length;
      expect(actual).toBe(expected);
    });
  });

  describe('When eventFields returns undefined', () => {
    it('returns an empty array', () => {
      const eventDefinition = { eventFields() {} };
      expect(createEvents(eventDefinition)).toEqual([]);
    });
  });

  describe('When eventFields returns undefined (with eventSchema)', () => {
    it('returns an empty array', () => {
      const eventDefinition = {
        eventFields() {},
        eventSchema: {
          someProp: val => val === 'hey',
        },
      };
      expect(createEvents(eventDefinition)).toEqual([]);
    });
  });

  describe('When eventFields returns null', () => {
    it('returns an empty array', () => {
      const eventDefinition = { eventFields: () => null };
      expect(createEvents(eventDefinition)).toEqual([]);
    });
  });

  describe('When eventFields returns a string', () => {
    it('returns that string in an array', () => {
      const eventDefinition = { eventFields: () => 'some string' };
      expect(createEvents(eventDefinition)).toEqual(['some string']);
    });
    describe('with an eventSchema', () => {
      const someProp = jest.fn();
      const eventDefinition = {
        eventFields: () => 'some string',
        eventSchema: { someProp },
      };

      const events = createEvents(eventDefinition);

      it('ignores the eventSchema', () => {
        expect(someProp).not.toHaveBeenCalled();
      });
      it('still returns the string in an array', () => {
        expect(events).toEqual(['some string']);
      });
    });
  });

  describe('When eventFields returns a number', () => {
    it('returns that number in an array', () => {
      const eventDefinition = { eventFields: () => 1234 };
      expect(createEvents(eventDefinition)).toEqual([1234]);
    });
    describe('with an eventSchema', () => {
      const someProp = jest.fn();
      const eventDefinition = {
        eventFields: () => 1234,
        eventSchema: { someProp },
      };
      const events = createEvents(eventDefinition);

      it('ignores the eventSchema', () => {
        expect(someProp).not.toHaveBeenCalled();
      });
      it('still returns the number in an array', () => {
        expect(events).toEqual([1234]);
      });
    });
  });
});
