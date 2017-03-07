function GoogleAnalytics(events) {
  events.forEach((event) => {
    if (event.hitType === 'pageview') {
      window.ga('set', 'page', event.page);
    }
    window.ga('send', event);
  });
}

module.exports = { GoogleAnalytics };
