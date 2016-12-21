/**
 * The possible values of hitType in custom data layer
 */
export type HitType = 'pageview' | 'event' | 'identify' | 'group' | 'alias';

/**
 * Used to send event to segment
 */
export interface SegmentEvent {
  hitType: HitType;
  userId?: string;
  groupId?: string;
  page?: string;
  eventAction?: string;
  [key: string]: any;
}

/**
 * A function that sends events to segment.io
 * @param {any[]} events that are need to be sent
 */
export function segment(events: any[]): void;
