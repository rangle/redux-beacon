const { createStore, applyMiddleware } = require('redux');

// (Redux Beacon) imports
const { createMiddleware } = require('redux-beacon');
const { logger } = require('redux-beacon/extensions/logger');
const { offlineWeb } = require('redux-beacon/extensions/offline-web');
const { GoogleAnalytics } = require('redux-beacon/targets/google-analytics');

const Actions = {
  PAGE_CHANGED: 'PAGE_CHANGED',
  CONNECTIVITY_CHANGED: 'CONNECTIVITY_CHANGED',
};

const initialState = {
  currentPage: '/',
  isConnected: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case Actions.PAGE_CHANGED:
      return Object.assign({}, state, { currentPage: action.payload });
    case Actions.CONNECTIVITY_CHANGED:
      return Object.assign({}, state, { isConnected: action.payload });
    default:
      return state;
  }
}

// (Redux Beacon) EventDefinition
const pageView = action => ({
  hitType: 'pageview',
  page: action.payload,
});

// (Redux Beacon) EventDefinitionsMap
const eventsMap = {
  PAGE_CHANGED: pageView,
};

// (Redux Beacon) offlineWeb
const offlineStorage = offlineWeb(state => state.isConnected);

// (Redux Beacon) createMiddleware
const analyticsMiddleware = createMiddleware(
  eventsMap,
  GoogleAnalytics,
  { logger, offlineStorage }
);

const store = createStore(reducer, applyMiddleware(analyticsMiddleware));

// --------------------------------------------------

function renderSite() {
  const state = store.getState();
  const pageHTML = (() => {
    switch (state.currentPage) {
      case '/':
        return '<p>This is the homepage content</p>';
      case '/news':
        return '<p>This is the content for the news</p>';
      case '/magazine':
        return '<p>This is the content for the magazine</p>';
      default:
        return '404, page not found';
    }
  })();
  document.getElementById('page').innerHTML = pageHTML;
}

store.subscribe(renderSite);

// --------------------------------------------------

document.getElementById('nav-link-home').addEventListener('click', function() {
  store.dispatch({ type: Actions.PAGE_CHANGED, payload: '/' });
});
document.getElementById('nav-link-news').addEventListener('click', function() {
  store.dispatch({ type: Actions.PAGE_CHANGED, payload: '/news' });
});
document.getElementById('nav-link-magazine').addEventListener('click', function() {
  store.dispatch({ type: Actions.PAGE_CHANGED, payload: '/magazine' });
});

// --------------------------------------------------

window.addEventListener('offline', () => {
  store.dispatch({
    type: Actions.CONNECTIVITY_CHANGED,
    payload: false,
  });
});

window.addEventListener('online', () => {
  store.dispatch({
    type: Actions.CONNECTIVITY_CHANGED,
    payload: true,
  });
});
