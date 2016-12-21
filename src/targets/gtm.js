function pushToDataLayer(events) {
  if (window !== undefined) {
    window.dataLayer = window.dataLayer || [];
    events.forEach(event => window.dataLayer.push(event));
  }
}

module.exports = { gtm: pushToDataLayer };
