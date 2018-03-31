If you're using Redux or ngrx/store to manage your app's state, you can use
Redux Beacon to tap into your dispatched actions and map them to events that are
consumable by an analytics service (e.g. Google Analytics). With Redux Beacon
your entire global state life-cycle becomes trackable.

#### ✓ _Redux Beacon is Lightweight_

[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/redux-beacon@next.svg?style=social)](https://bundlephobia.com/result?p=redux-beacon@2.0.0-rc.2)

The core Redux Beacon module is tiny (~ 1KB), and each target, extension, and util,
is either around the same size or smaller.

#### ✓ _Redux Beacon is Framework Agnostic_

Redux Beacon doesn't depend on any framework, you can use Redux Beacon with React,
Angular, React Native, Vue or just plain JavaScript.

#### ✓ _Redux Beacon Can Send Analytics Anywhere_

With Redux Beacon you can send analytics events anywhere. We have prebuilt
targets for the most popular analytics services, you can also build your own
custom targets if you need to.

#### ✓ _Redux Beacon Can Track Analytics Offline_

Redux Beacon provides extensions for tracking analytics during intermittent
outages in connectivity. These extensions save events in a persistent store when
offline (e.g indexedDB). When back online, the extensions purge the store and
pass the events off to a target. Read more about offline event collection in the
[docs](https://rangle.gitbook.io/redux-beacon/extensions/offlineweb).

## Packages
|                                                                                                                          | Version                                                                                                                                                                                 | Package                                                                                                                      |
|--------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
|                                                                                                                          | [![npm](https://img.shields.io/npm/v/redux-beacon.svg?style=flat-square)](https://www.npmjs.com/package/redux-beacon)                                                                   | [redux-beacon](https://rangle.gitbook.io/redux-beacon/api-reference)                                                                   |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-analytics)                               | [@redux-beacon/google-analytics](https://rangle.gitbook.io/redux-beacon/targets/googleanalytics)                               |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-analytics-gtag.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-analytics-gtag)                     | [@redux-beacon/google-analytics-gtag](https://rangle.gitbook.io/redux-beacon/targets/googleanalyticsgtag)                     |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-tag-manager)                           | [@redux-beacon/google-tag-manager](https://rangle.gitbook.io/redux-beacon/targets/googletagmanager)                           |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/react-native-google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/react-native-google-analytics)     | [@redux-beacon/react-native-google-analytics](https://rangle.gitbook.io/redux-beacon/targets/react-native-googleanalytics)     |
| ![Google](https://www.google.com/favicon.ico)                                                                            | [![npm](https://img.shields.io/npm/v/@redux-beacon/react-native-google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/react-native-google-tag-manager) | [@redux-beacon/react-native-google-tag-manager](https://rangle.gitbook.io/redux-beacon/targets/react-native-googletagmanager) |
| ![Amplitude](https://amplitude.com/favicon.ico)                                                                          | [![npm](https://img.shields.io/npm/v/@redux-beacon/amplitude.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/amplitude)                                             | [@redux-beacon/amplitude](https://rangle.gitbook.io/redux-beacon/targets/amplitude)                                             |
| ![Segment](https://d1gi394wp2tyv2.cloudfront.net/app/4.244.0/favicon-6430a09ca7d7fb4217290b0d1a7a0ae3-favicon-32x32.png) | [![npm](https://img.shields.io/npm/v/@redux-beacon/segment.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/segment)                                                 | [@redux-beacon/segment](https://rangle.gitbook.io/redux-beacon/targets/segment)                                                 |
| 🔌                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/logger.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/logger)                                                   | [@redux-beacon/logger](https://rangle.gitbook.io/redux-beacon/extensions/logger)                                                   |
| 🔧                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/combine-events.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/combine-events)                                   | [@redux-beacon/combine-events](https://rangle.gitbook.io/redux-beacon/utils/combineevents)                                   |
| 🔧                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/ensure.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/ensure)                                                   | [@redux-beacon/ensure](https://rangle.gitbook.io/redux-beacon/utils/ensure)                                                   |
| 🔌                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/offline-web.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/offline-web)                                         | [@redux-beacon/offline-web](https://rangle.gitbook.io/redux-beacon/extensions/offlineweb)                                         |
| 🔌                                                                                                                       | [![npm](https://img.shields.io/npm/v/@redux-beacon/offline-react-native.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/offline-react-native)                       | [@redux-beacon/offline-react-native](https://rangle.gitbook.io/redux-beacon/extensions/offlinereactnative)                       |

## API Overview

When using Redux Beacon the bulk of your work will be in an `eventsMap` which is
an object that maps action types to analytics events. Here's what an `eventsMap`
might look like:

```js
const eventsMap = {

  // Track a page view on each 'ROUTE_CHANGED' action
  'ROUTE_CHANGED': trackPageView(action => ({
    page: action.payload.routerState.url,
  })),


  // Track an event on each 'VIDEO_SELECTED' action, use the state before
  // the action and the state after the action to hydrate the analytics event
  'VIDEO_SELECTED': trackEvent((action, prevState, nextState) => ({
    category: 'Videos',
    action: action.type,
    label: prevState.videos.currentCampaign,
    value: nextState.videos.numVideosSelected,
  }))


  // Track an event on _every_ action with the special '*' key
  '*': trackEvent(action => ({
    category: 'redux',
    action: action.type,
  })),


  // Track multiple events on each 'VIDEO_PLAYED' action with the
  // combineEvents util
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


  // Track an event on each 'VIDEO_SEARCHED' action, but throttle it with
  // the debounceEvent util so it doesn't fire as often
  'VIDEO_SEARCHED': debounceEvent(300,
     trackEvent(action => ({
       category: 'Videos',
       action: 'search',
       label: action.payload.searchTerm,
     }))
   ),

};
```

The `trackPageView`, `trackEvent`, and `trackTiming` functions used above are
called `eventDefinitions` and are what you use to create events that are
consumable by an analytics service (a.k.a "target"). Each target will have its
own set of `eventDefinitions` that you can use and customize. In a nutshell,
each time you want to track something:

  1. Find the event definition for the thing you want to track.
  2. Match the event definition to a Redux action then fill in the event
     definition.

If the `eventsMap` object doesn't meet your needs you can also use an
`eventsMapper` function to map action types to event definitions:

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
