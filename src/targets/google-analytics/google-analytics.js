function GoogleAnalytics(events) {
  if (typeof window === 'undefined' || typeof window.ga !== 'function') {
    return;
  }
  events.forEach((event) => {
    if (event.hitType === 'pageview') {
      window.ga('set', 'page', event.page);
    }
    window.ga('send', event);
  });
}

module.exports = { GoogleAnalytics };
