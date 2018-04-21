<p align="center">
  <a href="https://rangle.github.io/redux-beacon/">
    <img alt="Redux Beacon" src="https://raw.githubusercontent.com/rangle/redux-beacon/af4a88229194291f6b6c9f5311b86488f6b16f1d/logo/redux-beacon-logomark.png" width="150">
  </a>
</p>

<h3 align="center">Redux Beacon</h3>

<p align="center">
Analytics integration for Redux and ngrx/store
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/redux-beacon"><img src="https://img.shields.io/npm/v/redux-beacon.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/redux-beacon"><img src="https://img.shields.io/npm/dm/redux-beacon.svg?style=flat-square"></a>
  <a href="https://bundlephobia.com/result?p=redux-beacon"><img src="https://img.shields.io/bundlephobia/minzip/redux-beacon.svg?style=flat-square"></a>
</p>

## [Docs](https://rangle.gitbook.io/redux-beacon/)

 - [Migration Guide (from v1 to v2)](https://rangle.gitbook.io/redux-beacon/migration-guide-v1-to-v2)
 - [Getting Started (Redux users)](https://rangle.gitbook.io/redux-beacon/getting-started-redux)
 - [Getting Started (ngrx users)](https://rangle.gitbook.io/redux-beacon/getting-started-ngrx)

## Introduction

If you're using Redux or ngrx/store to manage your app's state, you can use
Redux Beacon to tap into your dispatched actions and map them to events that are
consumable by an analytics service (e.g. Google Analytics). With Redux Beacon
your entire global state life-cycle becomes trackable.

<p align="center">
  <img alt="Redux Beacon Diagram" src="https://user-images.githubusercontent.com/7446702/38284923-bf9e2b56-378b-11e8-99b0-0416b1efab46.gif">
</p>

 - **Redux Beacon is lightweight**. The core Redux Beacon module is tiny (~ 1KB), and each target, extension, and
   util, is either around the same size or smaller.

 - **You can use Redux Beacon with any framework**. Redux Beacon doesn't depend on any
   framework, you can use Redux Beacon with React, Angular, React Native, Vue or
   just plain JavaScript.

 - **You can send analytics anywhere**. We have prebuilt targets for the most
   popular analytics services, you can also build your own custom targets if you
   need to.

 - **You can track analytics offline**. Redux Beacon provides
   extensions for tracking analytics during intermittent outages in
   connectivity. These extensions save events in a persistent store when offline
   (e.g indexedDB). When back online, the extensions purge the store and pass
   the events off to a target. Read more about offline event collection in the
   [docs](https://rangle.gitbook.io/redux-beacon/extensions/offlineweb).

## Packages

|                                                                                                                          | Version                                                                                                                                                                                 | Package                                                                                                                       |
|--------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
|                                                                                                                          | [![npm](https://img.shields.io/npm/v/redux-beacon.svg?style=flat-square)](https://www.npmjs.com/package/redux-beacon)                                                                   | [redux-beacon](https://rangle.gitbook.io/redux-beacon/api-reference)                                                          |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-analytics)                               | [@redux-beacon/google-analytics](https://rangle.gitbook.io/redux-beacon/targets/googleanalytics)                              |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-analytics-gtag.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-analytics-gtag)                     | [@redux-beacon/google-analytics-gtag](https://rangle.gitbook.io/redux-beacon/targets/googleanalyticsgtag)                     |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-tag-manager)                           | [@redux-beacon/google-tag-manager](https://rangle.gitbook.io/redux-beacon/targets/googletagmanager)                           |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/react-native-google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/react-native-google-analytics)     | [@redux-beacon/react-native-google-analytics](https://rangle.gitbook.io/redux-beacon/targets/react-native-googleanalytics)    |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/react-native-google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/react-native-google-tag-manager) | [@redux-beacon/react-native-google-tag-manager](https://rangle.gitbook.io/redux-beacon/targets/react-native-googletagmanager) |
| ![Amplitude](https://amplitude.com/favicon.ico)                                                                          | [![npm](https://img.shields.io/npm/v/@redux-beacon/amplitude.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/amplitude)                                             | [@redux-beacon/amplitude](https://rangle.gitbook.io/redux-beacon/targets/amplitude)                                           |
| ![Segment](https://d1gi394wp2tyv2.cloudfront.net/app/4.244.0/favicon-6430a09ca7d7fb4217290b0d1a7a0ae3-favicon-32x32.png) | [![npm](https://img.shields.io/npm/v/@redux-beacon/segment.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/segment)                                                 | [@redux-beacon/segment](https://rangle.gitbook.io/redux-beacon/targets/segment)                                               |
| 🔌                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/logger.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/logger)                                                   | [@redux-beacon/logger](https://rangle.gitbook.io/redux-beacon/extensions/logger)                                              |
| 🔧                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/combine-events.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/combine-events)                                   | [@redux-beacon/combine-events](https://rangle.gitbook.io/redux-beacon/utils/combineevents)                                    |
| 🔧                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/ensure.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/ensure)                                                   | [@redux-beacon/ensure](https://rangle.gitbook.io/redux-beacon/utils/ensure)                                                   |
| 🔧                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/debounce-event.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/debounce-event)                                   | [@redux-beacon/debounce-event](https://rangle.gitbook.io/redux-beacon/utils/debounce-event)                                   |
| 🔌                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/offline-web.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/offline-web)                                         | [@redux-beacon/offline-web](https://rangle.gitbook.io/redux-beacon/extensions/offlineweb)                                     |
| 🔌                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/offline-react-native.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/offline-react-native)                       | [@redux-beacon/offline-react-native](https://rangle.gitbook.io/redux-beacon/extensions/offlinereactnative)                    |


## Usage

 - **Step 1.** Pick out a target _(see above)_

 - **Step 2.** Pick out some events you want to track from your target's Event Definitions section

 - **Step 3.** Match the events to action types _(see below)_

### Examples

_Track a page view on each `ROUTE_CHANGED` action_
```js
const eventsMap = {
  'ROUTE_CHANGED': trackPageView(action => ({
    page: action.payload.routerState.url,
  })),
}
```

_Track an event on each `VIDEO_SELECTED` action, use the state before the action
and the state after the action to hydrate the analytics event_
```js
const eventsMap = {
  'VIDEO_SELECTED': trackEvent((action, prevState, nextState) => ({
    category: 'Videos',
    action: action.type,
    label: prevState.videos.currentCampaign,
    value: nextState.videos.numVideosSelected,
  }))
}
```

_Track an event on _every_ action using the special '*' key_
```js
const eventsMap = {
  '*': trackEvent(action => ({
    category: 'redux',
    action: action.type,
  })),
}
```

_Track multiple events on each `VIDEO_PLAYED` action using the `combineEvents` util_

```js
const eventsMap = {
  'VIDEO_PLAYED': combineEvents(
    trackTiming(action => ({
      category: 'Videos',
      action: 'load',
      value: action.payload.loadTime,
    }))
    trackEvent(() => ({
      category: 'Videos',
      action: 'play'
    })),
  ),
}
```

_Track an event on each 'VIDEO_SEARCHED' action, but throttle it with the debounceEvent util so it doesn't fire as often_

```js
const eventsMap = {
  'VIDEO_SEARCHED': debounceEvent(300,
     trackEvent(action => ({
       category: 'Videos',
       action: 'search',
       label: action.payload.searchTerm,
     }))
   ),
}
```

The `trackPageView`, `trackEvent`, and `trackTiming` functions used above are
called `eventDefinitions` and are what you use to create events that are
consumable by an analytics service (a.k.a "target"). Each target will have its
own set of `eventDefinitions` that you can use and customize.

**Don't like the idea of using an object to map actions?**

_You can use a function..._
```js
const pageView = trackPageView(action => ({
  page: action.payload.routerState.url,
}));

const videoLoadTime = trackTiming(action => ({
   category: 'Videos',
   action: 'load',
   value: action.payload.loadTime,
}));

const videoPlayed = trackEvent(() => ({
  category: 'Videos',
  action: 'play'
}));

const eventsMapper = (action) => {
  switch(action.type) {
    case 'ROUTE_CHANGED':
      return pageView;
    case 'VIDEO_PLAYED':
      return [videoLoadTime, videoPlayed]
    default:
      return [];
  }
}
```

## More Examples & Recipes
 - [How to Track Pageviews in a React-Redux app](https://rangle.gitbook.io/redux-beacon/examples-and-recipes#how-to-track-pageviews-in-a-react-redux-app)
 - [How to Track Pageviews in an Angular-ngrx app](https://rangle.gitbook.io/redux-beacon/examples-and-recipes#how-to-track-pageviews-in-an-angular-ngrx-app)
 - [How to Track Analytics Offline (Web)](https://rangle.gitbook.io/redux-beacon/extensions/offlineweb)
 - [How to Track Analytics Offline (React Native)](https://rangle.gitbook.io/redux-beacon/extensions/offlinereactnative)
