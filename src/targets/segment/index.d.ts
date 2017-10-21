import { Target } from '../../../';

/**
 * Creates the Segment target
 */
export function Segment(): Target;

export interface Event {
  hitType: 'event';
  eventAction: string;
  [key: string]: any;
}

export interface PageView {
  hitType: 'pageview';
  page: string;
  [key: string]: any;
}

export interface Alias {
  hitType: 'alias';
  userId: string;
  [key: string]: any;
}

export interface Group {
  hitType: 'group';
  groupId: string;
  [key: string]: any;
}

export interface Identify {
  hitType: 'identify';
  userId: string;
  [key: string]: any;
}
