function GoogleTagManager(events) {
  events.forEach(event => window.dataLayer.push(event));
}

module.exports = { GoogleTagManager };
