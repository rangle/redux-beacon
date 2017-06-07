# Redux Beacon Quick Start (ngrx users)

Say your app uses ngrx/store to manage its routes. Whenever a
route changes it fires the following action:

```js
{
  type: '[Router] Update Location',
  payload: {
    path: '/some/new/route',
  },
}
```

> You can use
> the [ngrx/router-store](https://github.com/ngrx/router-store) to
> automatically sync angular/router changes with ngrx/store.

Here's how you would set up Redux Beacon to push a pageview event to
Google Analytics whenever the route changes:

```js
// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule, Action } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }  from './app.component';
import { appRoutes } from './app.routes';

// Import createMetaReducer and a target
import { createMetaReducer } from 'redux-beacon';
import {
  GoogleAnalytics,
  PageView,
} from 'redux-beacon/targets/google-analytics';

// import helpers to sync the store with the router
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

// Define an event
const pageView = (action: Action): PageView => ({
  hitType: 'pageview',
  page: action.payload.path,
});

// Map the event to an ngrx/store action
const eventsMap = {
  '[Router] Update Location': pageView,
};

// Create the meta Reducer
const analyticsMetaReducer = createMetaReducer(eventsMap, GoogleAnalytics);

// A meta reducer is just a function that takes in a reducer, and
// spits out an augmented reducer.

@NgModule({
  imports: [
   BrowserModule,
   RouterModule.forRoot(appRoutes),
   RouterStoreModule.connectRouter(),
   StoreModule.provideStore({
       // Wrap the router reducer in the meta reducer
       router: analyticsMetaReducer(routerReducer),
   })
 ],
 declarations: [ AppComponent ],
 bootstrap: [ AppComponent ]
})

export class AppModule { }
```

Now, whenever the app dispatches the `[Router] Update Location` action,
Redux Beacon will create a pageview event and push it to the Google
Analytics target.

----

### [See A Full Working Example](https://github.com/rangle/redux-beacon/tree/master/examples/google-analytics-ngrx)
