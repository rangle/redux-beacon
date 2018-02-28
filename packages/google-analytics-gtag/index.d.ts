type Target = (events: any[]) => void;

/**
 * Creates the Google Analytics Gtag target
 */
export function GoogleAnalyticsGtag(trackingId: string): Target;

export interface PageView {
  type: 'page';
  trackingId?: string | Array<string>;
  page_title?: string;
  page_location?: string;
  page_path?: string;
}

export interface Event {
  type: 'event';
  name: string;
  [key: string]: any;
}
