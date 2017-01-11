# Redux Beacon
[![license](https://img.shields.io/github/license/rangle/redux-beacon.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/redux-beacon.svg)](https://www.npmjs.com/package/redux-beacon)
[![CircleCI](https://img.shields.io/circleci/project/github/rangle/redux-beacon.svg)](https://circleci.com/gh/rangle/redux-beacon)

> Analytics integration for Redux and ngrx/store

```bash
npm install --save redux-beacon
```
----

## How it works

Rendux-Beacon provides a way to map your Redux or ngrx actions to
analytics events. Once generated, Redux-Beacon sends the analytics
events to a given target (e.g. Google Analytics).

Analytics events are defined in an event definition, and mapped to a
given action in an event definitions map:

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

Redux-Beacon provides some prebuilt targets for popular analytics
services:

 - [Google Analytics]()
 - [Google Tag Manager]()
 - [Segment.io]()
 - [_(React Native)_ Google Analytics]()
 - [_(React Native)_ Google Tag Manager]()

## Quick Start
 - [For Redux users]()
 - [For ngrx/store users]()

## Docs
Check out the [project site](https://rangle.github.io/redux-beacon/)
for API docs, tutorials, examples and more.
