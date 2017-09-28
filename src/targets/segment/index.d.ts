/**
 * A function that sends events to segment.io
 * @param {any[]} events that are need to be sent
 */
export function Segment(events: any[]): void;

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