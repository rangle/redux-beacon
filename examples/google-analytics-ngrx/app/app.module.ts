import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule, Action } from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { storeLogger } from "ngrx-store-logger";
import { RouterModule, Routes } from '@angular/router';

// (redux-beacon)
import { createMetaReducer } from 'redux-beacon';
import { GoogleAnalytics, Event, PageView } from 'redux-beacon/targets/google-analytics';
import { logger } from 'redux-beacon/extensions/logger';

import { AppComponent }  from './app.component';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';

import {
  countReducer,
  COUNT_DECREMENTED,
  COUNT_INCREMENTED,
} from './counter';

// (redux-beacon)
const eventsMap = {
  COUNT_DECREMENTED: {
    eventFields: (action: Action): Event => ({
      hitType: 'event',
      eventCategory: 'count-changed',
      eventAction: action.type,
    }),
  },
  COUNT_INCREMENTED: {
    eventFields: (action: Action): Event => ({
      hitType: 'event',
      eventCategory: 'count-changed',
      eventAction: action.type,
    }),
  },
  '[Router] Update Location': {
    eventFields: (action: Action): PageView => ({
      hitType: 'pageview',
      page: action.payload.path,
    }),
  },
};

// (redux-beacon)
const analyticsMetaReducer = createMetaReducer(eventsMap, GoogleAnalytics, { logger });
// A meta reducer is just a function that takes in a reducer, and spits out
// an augmented reducer, there isn't

const loggerMetaReducer = storeLogger();

const appRoutes: Routes = [
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore({
      count: loggerMetaReducer(analyticsMetaReducer(countReducer)), // (redux-beacon)
      router: routerReducer,
    })
  ],
  declarations: [ AppComponent, Page1Component, Page2Component ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
