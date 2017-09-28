import { ActionReducer, Action } from '@ngrx/store';

export const COUNT_INCREMENTED = 'COUNT_INCREMENTED';
export const COUNT_DECREMENTED = 'COUNT_DECREMENTED';

export function countReducer(state: number = 0, action: Action) {
  switch(action.type) {
    case COUNT_INCREMENTED:
      return state + 1;
    case COUNT_DECREMENTED:
      return state - 1;
    default:
      return state;
  }
}
