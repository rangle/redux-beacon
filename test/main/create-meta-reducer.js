const { createStore } = require('redux');
const createMetaReducer = require('../../src/main/create-meta-reducer');

describe('createMetaReducer(eventDefinitionsMap, target, extensions?)', () => {
  describe('When ngrx/store dispatches an action that has an event definition', () => {
    it('creates the event and pushes it to the target', () => {
      const initialState = { route: '/home' };
      const expectedAnalyticsEvent = {
        hitType: 'pageview',
        page: '/my-account',
        referrer: '/home',
      };
      const eventDefinition = {
        eventFields(action, prevState) {
          return {
            hitType: 'pageview',
            page: action.payload,
            referrer: prevState.route,
          };
        },
      };
      const eventDefinitionsMap = { ROUTE_CHANGED: eventDefinition };

      const target = jest.fn();
      const metaReducer = createMetaReducer(eventDefinitionsMap, target);
      const reducer = (state = initialState) => state; // just a dummy reducer
      const store = createStore(metaReducer(reducer));

      store.dispatch({
        type: 'ROUTE_CHANGED',
        payload: '/my-account',
      });

      expect(target).toHaveBeenCalledWith([expectedAnalyticsEvent]);
    });
  });

  describe('When an action does not have an associated event definition', () => {
    it('does not push any events to the target', () => {
      const eventsMap = {};
      const target = jest.fn();

      const metaReducer = createMetaReducer(eventsMap, target);
      const reducer = state => state;
      const store = createStore(metaReducer(reducer));

      store.dispatch({ type: 'SOME_REDUX_ACTION' });

      expect(target).not.toHaveBeenCalled();
    });
  });
});
