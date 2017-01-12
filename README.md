[![CircleCI](https://img.shields.io/circleci/project/github/rangle/redux-beacon.svg)](https://circleci.com/gh/rangle/redux-beacon)
[![npm version](https://img.shields.io/npm/v/redux-beacon.svg)](https://www.npmjs.com/package/redux-beacon)
[![license](https://img.shields.io/github/license/rangle/redux-beacon.svg)](LICENSE)

# <img title="redux-beacon" src="logo/redux-beacon-logo-dark.png" width="33%">

Analytics integration for Redux and ngrx/store

```bash
npm install --save redux-beacon
```

## How it works

Rendux-Beacon provides a way to map your Redux or ngrx actions to
analytics events. Once generated, Redux-Beacon sends the analytics
events to a given target (e.g. Google Analytics).

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
fired, then it will push the generated event to a given target
(e.g. Google Analytics).

## Quick Start
 - [For Redux users](https://rangle.github.io/redux-beacon/docs/quick-start/redux-users.html)
 - [For ngrx/store users](https://rangle.github.io/redux-beacon/docs/quick-start/ngrx-users.html)

## Targets
Redux-Beacon provides prebuilt targets for some popular analytics
services:

 - [Google Analytics](https://rangle.github.io/redux-beacon/docs/targets/google-analytics.html)
 - [Google Tag Manager](https://rangle.github.io/redux-beacon/docs/targets/google-tag-manager.html)
 - [Segment.io](https://rangle.github.io/redux-beacon/docs/targets/segment.html)
 - [_(React Native)_ Google Analytics](https://rangle.github.io/redux-beacon/docs/targets/react-native-google-analytics.html)
 - [_(React Native)_ Google Tag Manager](https://rangle.github.io/redux-beacon/docs/targets/react-native-google-tag-manager.html)

## Docs
Check out the [project site](https://rangle.github.io/redux-beacon/)
for API docs, tutorials, examples and more.
