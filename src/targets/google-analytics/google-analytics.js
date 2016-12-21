function GoogleAnalytics(ga) {
  return function GoogleAnalyticsTarget(events) {
    events.forEach(event => ga('send', event));
  };
}

module.exports = { GoogleAnalytics };
