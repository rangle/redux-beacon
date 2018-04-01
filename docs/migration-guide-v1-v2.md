# What's New in v2?

For the most part most of your existing setup shouldn't have to change. There
are breaking changes to the way targets, utils, and extensions are imported (and
installed), and some breaking changes to the way targets are registered with
`createMiddleware` and `createMetaReducer`. But, once that's sorted, you can
enjoy all other enhancements incrementally at your own pace.

### Everything's a Package

Redux Beacon has been split up into thirteen different npm packages! Each
package is self contained and versioned in isolation.

#### _Before_

```js
import { createMiddleware, createMetaReducer } from 'redux-beacon';

import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';
import { Segment } from 'redux-beacon/targets/segment';
import { GoogleAnalytics, GoogleTagManager } from 'redux-beacon/targets/react-native';
import { CordovaGoogleAnalytics } from 'redux-beacon/targets/cordova-google-analytics';

import { logger } from 'redux-beacon/extensions/logger';
import { offlineWeb } from 'redux-beacon/extensions/offline-web';
import { offlineReactNative } from 'redux-beacon/extensions/offline-react-native';
import { ensure } from 'redux-beaocn/utils';
```

#### _Now_

```js
import { createMiddleware, createMetaReducer } from 'redux-beacon';

import Amplitude from '@redux-beacon/amplitude';
import GoogleAnalytics from '@redux-beacon/google-analytics';
import GoogleAnalyticsGtag from '@redux-beacon/google-analytics-gtag';
import GoogleTagManager from '@redux-beacon/google-tag-manager';
import RnGoogleAnalytics from '@redux-beacon/react-native-google-analytics';
import RnGoogleTagManager from '@redux-beacon/react-native-google-tag-manager';
import Segment from '@redux-beacon/segment';

import logger from '@redux-beacon/logger';
import OfflineReactNative from '@redux-beacon/offline-react-native';
import OfflineWeb from '@redux-beacon/offline-web';

import combineEvents from '@redux-beacon/combine-events';
import ensure from '@redux-beacon/ensure';
```

Before, a breaking change to a single target, extension, or util would result in
a major version bump for the entire package. Since most users stick to one
target this could lead to confusion as there might be many version bumps without
any real impact to a user.

Another hope for this change is continuous frequent releases. Going forward, the
goal is to have an npm release with each new commit to `master`. Contributors
should no longer have to wait for weeks or months for another major release to
see their changes.

### All Targets Must Be Invoked

You now have to invoke each target before passing them to `createMiddleware` or
`createMetaReducer`. Some targets already behaved this way but now it's standard
across all targets.

#### _Before_

```js
import { MyTarget } from 'redux-beacon/targets/my-target';

const middleware = createMiddleware(eventsMap, MyTarget);
const metaReducer = createMetaReducer(eventsMap, MyTarget);
```

#### _Now_

```js
import MyTarget from '@redux-beacon/my-target';

const middleware = createMiddleware(eventsMap, MyTarget());
const metaReducer = createMetaReducer(eventsMap, MyTarget());
```

This allows for targets to introduce settings or options without the need for a
major version bump.

### New Docs Site

There's a new [Examples & Recipes](https://rangle.gitbook.io/redux-beacon/examples-and-recipes) page,
revised [Targets](https://rangle.gitbook.io/redux-beacon/targets) docs, revised Getting Started docs ([Redux](https://rangle.gitbook.io/redux-beacon/getting-started-redux) &
[ngrx](https://rangle.gitbook.io/redux-beacon/getting-started-ngrx)), two new
runnable examples
([Redux](https://codesandbox.io/s/4xkkp8n419) &
[ngrx](https://github.com/rangle/redux-beacon/tree/master/examples/ngrx-store)),
and more. Take a look around!

### Event Helpers

In v1 it wasn't always clear what you could and couldn't track. Now, each
target's docs has an `Event Definitions` section that lists out all the events
you can track.

Each time you want to track something, you:

  1. Find the event definition for the thing you want to track.
  2. Match the event definition to an action then fill in the event
     definition.

#### _Before_
```js
const event = action => ({
  hitType: 'event',
  customTrackerId: 'MY_CUSTOM_ID',
  eventCategory: 'Videos',
  eventAction: action.type,
}),
```
#### _Now_

```js
import { trackEvent } from '@redux-beacon/google-analytics';

const event = trackEvent((action) => ({
  category: 'Videos',
  action: action.type,
}), 'MY_CUSTOM_ID');
```

### Async Event Definitions

You can now return a Promise from an event definition. Here's an example of one
way you could use this feature with the new `debounceEvent` util:

```js
const videoSearched = debounceEvent(300,
 trackEvent(action => ({
   category: 'Videos',
   action: 'search',
   label: action.payload.searchTerm,
  }))
);
```

### Events Mapper

Now you have the option to pass `createMiddleware` and `createMetaReducer` a
function instead of an object to map action types to event
definitions. Here's an example:

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

### And More...

 - There's a new target: Google Analytics (gtag.js) ([#157](https://github.com/rangle/redux-beacon/pull/157))
 - The Google Analytics target now supports the enhanced eCommerce plugin ([#139](https://github.com/rangle/redux-beacon/pull/139))
 - The Amplitude target now supports the [amplitude-js](https://www.npmjs.com/package/amplitude-js) ([#160](https://github.com/rangle/redux-beacon/pull/160))
 - Events that are saved offline, are now purged _as soon_ as the app regains connection ([#168](https://github.com/rangle/redux-beacon/pull/168))
 - The React Native Google Analytics target now supports custom dimensions ([#181](https://github.com/rangle/redux-beacon/pull/181))
 - The React Native Google Analytics target now supports purchase events ([#189](https://github.com/rangle/redux-beacon/pull/189))
 - The Cordova Google Analytics target is no longer being maintained ([#192](https://github.com/rangle/redux-beacon/pull/192))
