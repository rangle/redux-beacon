function GoogleAnalytics(events) {
  events.forEach((event) => { window.ga('send', event); });
}

module.exports = { GoogleAnalytics };
