import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RouterState } from '@ngrx/router-store';

import {
  COUNT_DECREMENTED,
  COUNT_INCREMENTED,
} from './counter';

interface AppState {
  count: number;
  router: RouterState;
}

@Component({
  selector: 'my-app',
  template: `
    <h1>Redux-Beacon GA Example</h1>
    <div>Count: {{ count | async }}</div>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <hr>
    <nav>
      <a routerLink="/page1">Page 1</a>
      <a routerLink="/page2">Page 2</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  {
  count: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count = store.select('count');
  }

  increment() {
    this.store.dispatch({ type: COUNT_INCREMENTED });
  }

  decrement() {
    this.store.dispatch({ type: COUNT_DECREMENTED });
  }
}
