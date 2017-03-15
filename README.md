<p align="center">
  <a href="https://rangle.github.io/redux-beacon/">
    <img alt="Redux Beacon" src="https://raw.githubusercontent.com/rangle/redux-beacon/af4a88229194291f6b6c9f5311b86488f6b16f1d/logo/redux-beacon-logomark.png" width="150">
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

----

 * Works with Angular, React, and React Native
 * Supports _every_ analytics platform, including:
   * Google Analytics
   * Google Tag Manager
   * Segment.io
   * Amplitude
 * Can track analytics offline
 * Supports Typescript

----

```bash
npm install --save redux-beacon
```
<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/7446702/23868943/b5a26442-07f7-11e7-935a-59048e02eb5b.gif">
  <img src="https://cloud.githubusercontent.com/assets/7446702/23869223/949ae1b0-07f8-11e7-93fd-0b904f3660ea.gif">
</p>

## Quick Start
 - [For Redux users](https://rangle.github.io/redux-beacon/docs/quick-start/redux-users.html)
 - [For ngrx/store users](https://rangle.github.io/redux-beacon/docs/quick-start/ngrx-users.html)

## How it works

Redux-Beacon maps your Redux or ngrx actions to analytics events. Once
generated, Redux-Beacon sends the generated events to a target
(e.g. Google Analytics).

Analytics events are defined in an event definition, and mapped to
actions in an event definitions map:

```js
// Event Definition
const pageView = {
  eventFields: action => ({
    hitType: 'pageview',
    page: action.payload,
  }),
};

// Event Definitions Map
const eventsMap = {
  LOCATION_CHANGE: pageView,
}
```

With the above event definitions map, Redux-Beacon will create a
`pageView` event whenever an action with type `LOCATION_CHANGE` is
fired, then it will push the generated event to a target (e.g. Google
Analytics).

## Targets
Redux-Beacon provides prebuilt targets for some popular analytics
services:

 - [Google Analytics](https://rangle.github.io/redux-beacon/docs/targets/google-analytics.html)
 - [Google Tag Manager](https://rangle.github.io/redux-beacon/docs/targets/google-tag-manager.html)
 - [Segment.io](https://rangle.github.io/redux-beacon/docs/targets/segment.html)
 - [Amplitude](https://rangle.github.io/redux-beacon/docs/targets/amplitude.html)
 - [_(React Native)_ Google Analytics](https://rangle.github.io/redux-beacon/docs/targets/react-native-google-analytics.html)
 - [_(React Native)_ Google Tag Manager](https://rangle.github.io/redux-beacon/docs/targets/react-native-google-tag-manager.html)

## Docs
Check out the [project site](https://rangle.github.io/redux-beacon/)
for API docs, tutorials, examples and more.
