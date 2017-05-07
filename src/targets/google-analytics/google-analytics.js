function GoogleAnalytics(events) {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.ga !== 'function') {
    throw new Error('window.ga is not defined, Have you forgotten to include Google Analytics?');
  }
  events.forEach((event) => {
    if (event.hitType === 'pageview') {
      window.ga('set', 'page', event.page);
    }
    window.ga('send', event);
  });
}

module.exports = { GoogleAnalytics };
