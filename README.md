<p align="center">
  <a href="https://rangle.github.io/redux-beacon/">
    <img alt="Redux Beacon" src="https://raw.githubusercontent.com/rangle/redux-beacon/af4a88229194291f6b6c9f5311b86488f6b16f1d/logo/redux-beacon-logomark.png" width="200">
  </a>
</p>

<p align="center">
Analytics integration for Redux and ngrx/store
</p>

<p align="center">
  <a href="https://circleci.com/gh/rangle/redux-beacon"><img src="https://img.shields.io/circleci/project/github/rangle/redux-beacon.svg"></a>
  <a href="https://www.npmjs.com/package/redux-beacon"><img src="https://img.shields.io/npm/v/redux-beacon.svg"></a>
  <a href="https://github.com/rangle/redux-beacon/blob/master/LICENSE"><img src="https://img.shields.io/github/license/rangle/redux-beacon.svg"></a>
</p>

## Features
 * Integrate with _any_ analytics service, including:
   * Google Analytics
   * Google Tag Manager
   * Segment.io
 * Track analytics offline
 * Decouple analytics logic from app logic

## Installation

```bash
npm install --save redux-beacon
```
## Demo

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/7446702/23868943/b5a26442-07f7-11e7-935a-59048e02eb5b.gif" width="750">
  <img src="https://cloud.githubusercontent.com/assets/7446702/23869223/949ae1b0-07f8-11e7-93fd-0b904f3660ea.gif" width="750">
</p>

## Quick Start
 - [I'm using Redux.](https://rangle.github.io/redux-beacon/docs/quick-start/redux-users.html)
 - [I'm using ngrx/store.](https://rangle.github.io/redux-beacon/docs/quick-start/ngrx-users.html)

## How it works

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/7446702/25776983/852cb482-329c-11e7-8196-e26b8664221c.png" width="600">
</p>

Redux Beacon maps redux/ngrx actions to analytics events then sends them to a target (e.g. Google Analytics).

Analytics events are defined in an event definition, and mapped to
actions in an event definitions map:

```js
// This is an event definition
const pageView = (action, prevState) => ({
  hitType: 'pageview',
  page: action.payload,
  referrer: prevState.route,
});

// This is another event definition
const buttonClick = action => ({
  hitType: 'event',
  eventCategory: 'button-click',
  eventAction: action.type,
});

// This is how you map event definitions to redux/ngrx actions
const eventsMap = {
  LOCATION_CHANGED: pageView,
  BUTTON_CLICKED: buttonClick,
}
```

With the set up above Redux Beacon will create `pageView`, and `buttonClick`
events whenever redux/ngrx dispatches `LOCATION_CHANGED` or `BUTTON_CLICKED`,
then it'll push the generated analytics events to a target (e.g. Google
Analytics).

## Offline Event Collection
<p align="center">
  <a href="https://rangle.github.io/redux-beacon/docs/notes-on-offline-events.html">
    <img src="https://cloud.githubusercontent.com/assets/7446702/25926466/60728c2e-35bd-11e7-85b2-7e265c968202.png" width="700">
  </a>
</p>

Redux Beacon provides extensions to help handle intermittent outages in
connectivity. These extensions place events in a persistent store when offline
(e.g indexedDB). When back online, the extensions purge the store and pass the
events off to a target. Read more about offline event collection in the
[docs](https://rangle.github.io/redux-beacon/docs/extensions/offline-web.html).


## Packages

|                                                             | Version                                                                                                                                                                                 | Package                                                                                                                      |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
|                                                             | [![npm](https://img.shields.io/npm/v/redux-beacon.svg?style=flat-square)](https://www.npmjs.com/package/redux-beacon)                                                                   | [redux-beacon](https://www.npmjs.com/package/redux-beacon)                                                                   |
| <img src="https://www.google.com/favicon.ico" width="25" /> | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-analytics)                               | [@redux-beacon/google-analytics](https://www.npmjs.com/package/@redux-beacon/google-analytics)                               |
| <img src="https://www.google.com/favicon.ico" width="25" /> | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-analytics-gtag.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-analytics-gtag)                     | [@redux-beacon/google-analytics-gtag](https://www.npmjs.com/package/@redux-beacon/google-analytics-gtag)                     |
| <img src="https://www.google.com/favicon.ico" width="25" /> | [![npm](https://img.shields.io/npm/v/@redux-beacon/google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/google-tag-manager)                           | [@redux-beacon/google-tag-manager](https://www.npmjs.com/package/@redux-beacon/google-tag-manager)                           |
| <img src="https://www.google.com/favicon.ico" width="25" /> | [![npm](https://img.shields.io/npm/v/@redux-beacon/react-native-google-analytics.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/react-native-google-analytics)     | [@redux-beacon/react-native-google-analytics](https://www.npmjs.com/package/@redux-beacon/react-native-google-analytics)     |
| <img src="https://www.google.com/favicon.ico" width="25" /> | [![npm](https://img.shields.io/npm/v/@redux-beacon/react-native-google-tag-manager.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/react-native-google-tag-manager) | [@redux-beacon/react-native-google-tag-manager](https://www.npmjs.com/package/@redux-beacon/react-native-google-tag-manager) |
| <img src="https://amplitude.com/favicon.ico" width="25" />  | [![npm](https://img.shields.io/npm/v/@redux-beacon/amplitude.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/amplitude)                                             | [@redux-beacon/amplitude](https://www.npmjs.com/package/@redux-beacon/amplitude)                                             |
| <img src="https://segment.com/favicon.ico" width="25" />    | [![npm](https://img.shields.io/npm/v/@redux-beacon/segment.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/segment)                                                 | [@redux-beacon/segment](https://www.npmjs.com/package/@redux-beacon/segment)                                                 |
| &#128268;                                                   | [![npm](https://img.shields.io/npm/v/@redux-beacon/logger.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/logger)                                                   | [@redux-beacon/logger](https://www.npmjs.com/package/@redux-beacon/logger)                                                   |
| &#128295;                                                   | [![npm](https://img.shields.io/npm/v/@redux-beacon/combine-events.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/combine-events)                                   | [@redux-beacon/combine-events](https://www.npmjs.com/package/@redux-beacon/combine-events)                                   |
| &#128295;                                                   | [![npm](https://img.shields.io/npm/v/@redux-beacon/ensure.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/ensure)                                                   | [@redux-beacon/ensure](https://www.npmjs.com/package/@redux-beacon/ensure)                                                   |
| &#128268;                                                   | [![npm](https://img.shields.io/npm/v/@redux-beacon/offline-web.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/offline-web)                                         | [@redux-beacon/offline-web](https://www.npmjs.com/package/@redux-beacon/offline-web)                                         |
| &#128268;                                                   | [![npm](https://img.shields.io/npm/v/@redux-beacon/offline-react-native.svg?style=flat-square)](https://www.npmjs.com/package/@redux-beacon/offline-react-native)                       | [@redux-beacon/offline-react-native](https://www.npmjs.com/package/@redux-beacon/offline-react-native)                       |


## Docs
Check out the [project site](https://rangle.github.io/redux-beacon/)
for API docs, tutorials, examples and more.
