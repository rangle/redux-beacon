type GoogleAnalyticsTarget = (events: any[]) => void;

export function GoogleAnalytics(ga: Function): GoogleAnalyticsTarget;