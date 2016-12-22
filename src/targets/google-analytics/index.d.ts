export function GoogleAnalytics(events: any[]): void;

export interface PageView {
  hitType: 'pageview';
  page?: string;
  title?: string;
  location?: string;
}

export interface Event {
  hitType: 'event';
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
}

export interface UserTiming {
  hitType: 'timing',
  timingCategory: string;
  timingVar: string;
  timingValue: number,
  timingLabel?: string,
}

export interface SocialInteraction {
  hitType: 'social',
  socialNetwork: string,
  socialAction: string,
  socialTarget: string,
}

export interface Exception {
  hitType: 'exception',
  exDescription?: string,
  exFatal?: boolean,
}
