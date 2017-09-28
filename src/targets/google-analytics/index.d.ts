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

export interface EcommItem {
  hitType: 'addItem',
  id: string,
  name: string,
  sku?: string,
  category?: string,
  price?: number,
  quantity?: number,
}

export interface EcommTransaction {
  hitType: 'addTransaction',
  id: string,
  affliation?: string,
  revenue?: number,
  shipping?: number,
  tax?: number,
}

export interface Exception {
  hitType: 'exception',
  exDescription?: string,
  exFatal?: boolean,
}
