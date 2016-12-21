const { createStore, applyMiddleware } = require('redux');
const createMiddleware = require('../../src/main/create-middleware');

describe('createMiddleware(eventDefinitionsMap, target, extensions?)', () => {
  describe('When Redux dispatches an action that has an event definition', () => {
    it('creates the event and pushes it to the target', () => {
      // Imagine an app that uses Redux to manage it's routes.
      // The app stores the current route under the "route" key in
      // state, and whenever a route changes, the app dispatches the
      // Redux action ROUTE_CHANGED with the new route as its payload.
      const initialState = { route: '/home' };
      // You're tasked with pushing an analytics event to some target
      // (e.g. Google Analytics) whenever a route changes. Your target
      // requires that the analytics event contain the new route, as
      // as well as the user's previous route.

      // For example, if the user moved from the "/home" page to the
      // "/my-account" page, the expected analytics event would look
      // like this:
      const expectedAnalyticsEvent = {
        hitType: 'pageview',
        page: '/my-account',
        referrer: '/home',
      };
      // First, create an event definition for the analytics event
      // (Note: please refer to /test/main/create-events for more
      // examples of event definitions),
      const eventDefinition = {
        eventFields(action, prevState) {
          return {
            hitType: 'pageview',
            page: action.payload,
            referrer: prevState.route,
          };
        },
      };
      // Next, map that event definition to the ROUTE_CHANGED action.
      const eventDefinitionsMap = { ROUTE_CHANGED: eventDefinition };

      // Then supply your target and the event definitions map to
      // ReduxBeacon.createMiddleware.
      const target = jest.fn();
      const middleware = createMiddleware(eventDefinitionsMap, target);
      // Finally, supply the middleware when creating the Redux store:
      const reducer = (state = initialState) => state; // just a dummy reducer
      const store = createStore(reducer, applyMiddleware(middleware));

      // Now, if the user moves from the initial route ("/home") to "/my-account"
      store.dispatch({
        type: 'ROUTE_CHANGED',
        payload: '/my-account',
      });

      // ReduxBeacon creates the analytics event and pushes it to the target
      expect(target).toHaveBeenCalledWith([expectedAnalyticsEvent]);
    });
  });

  describe('When an action does not have an associated event definition', () => {
    it('does not push any events to the target', () => {
      const eventsMap = {}; // no analytics events :(
      const target = jest.fn();

      const middleware = createMiddleware(eventsMap, target);
      const reducer = state => state;
      const store = createStore(reducer, applyMiddleware(middleware));

      // dispatch an action with no associated event definition:
      store.dispatch({ type: 'SOME_REDUX_ACTION' });

      expect(target).not.toHaveBeenCalled();
    });
  });
});
