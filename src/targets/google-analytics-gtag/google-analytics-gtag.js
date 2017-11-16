function GoogleAnalyticsGtag(gaTrackingId) {
  return function target(events) {
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof window.gtag !== 'function') {
      throw new Error(
        'window.gtag is not a function. Did you forget to include the Google Site Tag snippet?'
      );
    }

    const pageTracking = events.filter(event => event.type === 'page');
    const eventTracking = events.filter(event => event.type === 'event');

    pageTracking.forEach(event => {
      const { type, trackingId, ...params } = event;

      let trackingIds = [gaTrackingId];

      if (typeof trackingId === 'string') {
        trackingIds = [trackingId];
      }

      if (Array.isArray(trackingId)) {
        trackingIds = trackingId;
      }

      trackingIds.forEach(id => {
        window.gtag('config', id, params);
      });
    });

    eventTracking.forEach(event => {
      const { type, name, ...params } = event;

      window.gtag('event', name, params);
    });
  };
}

export default GoogleAnalyticsGtag;
