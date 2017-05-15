# Getting Started with ReduxBeacon

* [Sample App Overview](#sample-app-overview)
* [Prerequisites](#prerequisites)
* [Google Analytics Setup](#google-analytics-setup)
* [ReduxBeacon Installation and Configuration](#reduxbeacon-installation-and-configuration)
* [createGAevent](#creategaevent) needChange
* [createGApageview](#creategapageview) needChange
* [Conclusion](#conclusion)

----

Google Tag Manager (GTM) makes it quick and easy for digital marketers to manage what events are sent to analytics servers such as Google Analytics (GA). However, integrating GTM and developing a maintainable tagging strategy is challenging for those who are new to it. Here I am introducing an open source project called [ReduxBeacon](https://github.com/rangle/redux-beacon) that resolves the challenge with GTM integration for apps using [Redux](http://redux.js.org/) or [ngrx/store](https://github.com/ngrx/store).

The aim of this tutorial is to walk you through the basic setup of the library in a sample application. By the end of the tutorial, you will be able to track GA [pageviews](https://support.google.com/analytics/answer/6086080?hl=en) and GA custom events on any Angular2 application that uses Redux.

## Sample App Overview

angular2-redux-example is built with Angular 2, Redux, and Webpack and used at [Rangle](https://rangle.io/) as a teaching material. It is a counter that can increment and decrement by button clicks. Also it comprises a simple user authentication and a navigation to a secondary page using [ng2-redux-router](https://github.com/dagstuan/ng2-redux-router).

![example-app](https://cloud.githubusercontent.com/assets/4659414/20890849/7d217c3e-bad6-11e6-9573-df5a7448d462.gif)

## Prerequisites

+ Clone or download [angular2-redux-example](https://github.com/rangle/angular2-redux-example)
+ Get your GA account
+ Follow the provided links below for GTM setup and installation
    + [Create an account and container](https://support.google.com/tagmanager/answer/6103696?hl=en&ref_topic=3441530#CreatingAnAccount)
    + [Add the container snippet](https://developers.google.com/tag-manager/quickstart)

_src/index.html_
```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXX');</script>
            <!-- End Google Tag Manager -->

            ...

        </head>
        <body>
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->

            ...

        </body>
    </html>
```

The code snippet above shows where your GTM container snippet should be added (_you will have to replace `GTM-XXXXXX` with your own GTM ID that you created before_).

## Google Analytics Setup

ReduxBeacon provides a starter container that makes it easy to track basic GA pageview and event trackings with GTM.

1. Download [`GA starter`](https://raw.githubusercontent.com/rangle/redux-beacon/master/containers/ga-starter.json) from ReduxBeacon.
2. Login to [your own GTM container](#prerequisites)
3. In the top navigation, click through to the **ADMIN**
4. Under the **CONTAINER** options, click on the **Import Container**
5. Choose `GA starter` as your container file

<img width="1050" alt="import-ga-starter" src="https://cloud.githubusercontent.com/assets/4659414/20890853/7d2af052-bad6-11e6-9ee0-13e7edcf0024.png">

After importing the starter container to GTM, you should see some changes in the GTM workspace.

<img width="1404" alt="workspace-changes" src="https://cloud.githubusercontent.com/assets/4659414/20890854/7d2b5dbc-bad6-11e6-83e7-7bb59f22cf79.png">

Assign `GA_TRACKING_ID` with your own GA Account ID ([find your GA Account ID](https://support.google.com/analytics/answer/1032385?hl=en)).

Now we are ready to debug our container for the first time! You can find _How to preview and debug containers_ [here](https://support.google.com/tagmanager/answer/6107056?hl=en).
Having GTM's preview mode on, just run the following commands in _angular2-redux-example_ folder.
```
npm install
npm run dev
```
You should be able to see the app running on `localhost:8080` with GTM debugger.

<img width="1431" alt="first-gtm-debugging" src="https://cloud.githubusercontent.com/assets/4659414/20890850/7d2571c2-bad6-11e6-9080-78ad022c90e2.png">

### ReduxBeacon Installation and Configuration

Install **ReduxBeacon** by running `npm install redux-beacon --save`.
Next, we import `createMiddleware` from ReduxBeacon and create a simple event map for _`LOGIN_USER`_ action (the action is defined in `src/actions/session.actions.ts`). We define the map as `eventDefinitionsMap` in `src/app/sample-app.ts`.

```js

...

import { createMiddleware } from 'redux-beacon';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

const loginUserEventDefinition = {
  eventFields: (action, prevState) => ({
    hitType: 'event',
  })
};

const eventsMap = {
  'LOGIN_USER': loginUserEventDefinition,
};

const analyticsMiddleware = createMiddleware(eventsMap, GoogleTagManager);

...

export class RioSampleApp {

  ...

  constructor(
    private devTools: DevToolsExtension,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private actions: SessionActions,
    private epics: SessionEpics) {

    middleware.push(createEpicMiddleware(this.epics.login));

    // create and push ReduxGTM
    middleware.push(analyticsMiddleware);

    ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      devTools.isEnabled() ?
        [ ...enhancers, devTools.enhancer() ] :
        enhancers);

    ngReduxRouter.initialize();
  }
}
```

If you run `npm run dev` with GTM preview mode on and log in with one of the credentials given in `server/user.json` (e.g. `Username: "user"`, `Password: "pass"`), then you would see `event` event logged in GTM debugger.

![login-user-event](https://cloud.githubusercontent.com/assets/3966450/21784655/916760c6-d68a-11e6-9c24-d9c5cd17e678.png)

## Enhancing eventDefinition

Now we have a very basic event that GTM debugger reports. However, this event does not match with any of our GTM tags. To find a proper tag for the event, we need to provide more information in its definition by assigning a function to `eventFields`. Any function assigned to this property will receive the state of the application (before the action), and the associated action object `(action, prevState)` to specify [dataLayer](https://developers.google.com/tag-manager/devguide) variables and pass them to GTM as a tag trigger. With this function we can define any variables we would
like to emit with the event. The returned object is required to have `hitType, eventAction and eventCategory` properties and the optional `eventLabel and eventValue` properties.

```js
{
  hitType: 'event',
  eventAction, // defaults to "unkown action"
  eventCategory, // defaults to "unknown category"
  eventLabel, // defaults to "unknown label"
  eventValue, // defaults to "unknown value"
}
```

_src/app/sample-app.ts_

```js

...

// import Reduxeacon APIs
import { createMiddleware } from 'redux-beacon';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

const loginUserEventDefinition = {
  eventFields: (action, prevState) => ({
    hitType: 'event',
    eventAction: 'Click Login Button',
    eventCategory: 'Login',
    eventLabel: 'Login Attempt',
    eventValue: action.payload.username,
  })
};

const eventsMap = {
  'LOGIN_USER': loginUserEventDefinition,
};

...

```
GTM debugger logs that user login action now emits an event that has enough information to trigger `GAEvents` tag.

<img width="657" alt="login enhanced" src="https://cloud.githubusercontent.com/assets/3966450/21784656/916d225e-d68a-11e6-90d7-85ad0c713f01.png">

We can create eventDefinitions for other actions defined in `src/actions/session.actions.ts` and `src/actions/counter.actions.ts`.

## Create PageView event

Time to create a pageview which triggers `GAPageViews` tag. Similar to creating a `GAEvents` trigger, we assign a function to eventFields. The function should return an object with below properties.

```js
{
  hitType: 'pageview',
  page, // defaults to 'unknown page',
}
```
`ng2-redux-router` dispatches `UPDATE_LOCATION` action on every route change for which we can create a pageview event definition, hence, we need to import `UPDATE_LOCATION` from `ng2-redux-router`.

_src/app/sample-app.ts_

```js
import { NgReduxRouter, UPDATE_LOCATION } from 'ng2-redux-router';

...

// import ReduxBeacon APIs
import { createMiddleware } from 'redux-beacon';
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';

const loginUserEventDefinition = {
  eventFields: (action, prevState) => ({
    hitType: 'event',
    eventAction: 'Click Login Button',
    eventCategory: 'Login',
    eventLabel: 'Login Attempt',
    eventValue: action.payload.username,
  })
};

const pageViewEventDefinition = {
  eventFields: (action) => ({
    hitType: 'pageview',
    page: action.payload,
  })
};

const eventsMap = {
  'LOGIN_USER': loginUserEventDefinition,
  [UPDATE_LOCATION]: pageViewEventDefinition,
};
...
```

If we refresh our app running with GTM preview mode in a browser and click on `About Us` link on the top nav bar, we see `GAPageViews` tag triggered on route change.

<img width="1131" alt="page view" src="https://cloud.githubusercontent.com/assets/3966450/21784657/916dac4c-d68a-11e6-92a2-9b1ec529b2db.png">

## Conclusion

ReduxBeacon mitigates the challenge of synchronizing Redux actions to GTM events in your app. It definitely saves your time on studying for the third party integration for your app. Instead, it ensures you have more time for getting priceless feedback on product initiatives and insights that will grow a user base.
