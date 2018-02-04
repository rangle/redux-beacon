type Target = (events: any[]) => void;

/**
 * Creates the Google Analytics target
 */
export function GoogleAnalytics(): Target;

export interface PageView {
  hitType: 'pageview';
  page?: string;
  title?: string;
  location?: string;
  tracker?: string;
}

export interface Event {
  hitType: 'event';
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  tracker?: string;
}

export interface UserTiming {
  hitType: 'timing';
  timingCategory: string;
  timingVar: string;
  timingValue: number;
  timingLabel?: string;
  tracker? string;
}

export interface SocialInteraction {
  hitType: 'social',
  socialNetwork: string,
  socialAction: string,
  socialTarget: string,
  tracker?: string,
}

export interface Exception {
  hitType: 'exception',
  exDescription?: string,
  exFatal?: boolean,
  tracker?: string,
}

export interface EcommItem {
  hitType: 'addItem',
  id: string,
  name: string,
  sku?: string,
  category?: string,
  price?: number,
  quantity?: number,
  tracker?: string,
}

export interface EcommTransaction {
  hitType: 'addTransaction',
  id: string,
  affilation?: string,
  revenue?: number,
  shipping?: number,
  tax?: number,
  tracker?: string,
}

export interface EcommImpression {
  hitType: 'addImpression',
  ecommType: 'enhanced',
  id: string,
  name: string,
  list?: string,
  brand?: string,
  category?: string,
  variant?: string,
  position?: number,
  currency?: number,
  tracker?: string,
}

export interface EcommProduct {
  id: string,
  name: string,
  brand?: string,
  category?: string,
  variant?: string,
  price?: number,
  quantity?: number,
  coupon?: string,
  position?: number,
  tracker?: string,
}

export interface EcommPromotion {
  id: string,
  name: string,
  creative?: string,
  position?: string,
  tracker?: string,
}

export interface EcommAction {
  id: string,
  affiliation?: string,
  revenue?: number,
  tax?: number,
  shipping?: number,
  coupon?: string,
  list?: string,
  step?: number,
  option?: string,
  tracker?: string,
}
