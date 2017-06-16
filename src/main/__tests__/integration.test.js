const { createStore, applyMiddleware } = require('redux');
const { createMiddleware, createMetaReducer } = require('../');

function runIntegrationTests(title, prepareStore) {
  describe(title, () => {
    describe('When an action with an associated event definition is dispatched', () => {
      it('creates the event and pushes it to the target', () => {
        const eventsMap = {
          ROUTE_CHANGED: (action, prevState, nextState) => ({
            hitType: 'pageview',
            page: action.payload,
            referrer: prevState.route,
            numActions: nextState.numActions,
          }),
        };
        const target = jest.fn();

        const initialState = {
          route: '/home',
          numActions: 0,
        };
        const reducer = (state = initialState, action) => {
          if (action.type === 'ROUTE_CHANGED') {
            return Object.assign({}, state, {
              route: action.payload,
              numActions: state.numActions + 1,
            });
          }
          return state;
        };

        const store = prepareStore(reducer, eventsMap, target);

        store.dispatch({ type: 'ROUTE_CHANGED', payload: '/my-account' });

        expect(target).toHaveBeenCalledWith([{
          hitType: 'pageview',
          page: '/my-account',
          referrer: '/home',
          numActions: 1,
        }]);
      });
    });

    describe('When an action does not have an associated event definition', () => {
      it('does not push any events to the target', () => {
        const eventsMap = {};
        const target = jest.fn();

        const reducer = state => state;
        const store = prepareStore(reducer, eventsMap, target);

        // dispatch an action with no associated event definition:
        store.dispatch({ type: 'SOME_REDUX_ACTION' });

        expect(target).not.toHaveBeenCalled();
      });
    });

    describe('When an event definition is validated', () => {
      it('only pushes valid events to the target', () => {
        const onlyEventsOfType = (...hitTypes) => eventDef => (...args) =>
          eventDef(...args).map(
            event => ([...hitTypes].includes(event.hitType) ? event : null)
          );

        const eventDef = () => ([
          { hitType: 'pageview' },
          { hitType: 'not-pageview-or-error' },
        ]);

        const eventsMap = {
          ROUTE_CHANGED: onlyEventsOfType('pageview', 'error')(eventDef),
        };
        const target = jest.fn();

        const reducer = (state = { route: '/home' }) => state;
        const store = prepareStore(reducer, eventsMap, target);

        store.dispatch({ type: 'ROUTE_CHANGED', payload: '/my-account' });

        expect(target).toHaveBeenCalledWith([{ hitType: 'pageview' }]);
      });
    });
  });
}

runIntegrationTests(
  'createMiddleware(eventDefinitionsMap, target, extensions?)',
  (reducer, eventsMap, target) =>
    createStore(reducer, applyMiddleware(createMiddleware(eventsMap, target)))
);

runIntegrationTests(
  'createMetaReducer(eventDefinitionsMap, target, extensions?)',
  (reducer, eventsMap, target) =>
    createStore(createMetaReducer(eventsMap, target)(reducer))
);
