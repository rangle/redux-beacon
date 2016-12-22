function GoogleAnalytics() {
  return function GoogleAnalyticsTarget(events) {
    events.forEach(event => { window.ga('send', event); });
  };
}

module.exports = { GoogleAnalytics };
