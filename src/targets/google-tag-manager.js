function GoogleTagManager(dataLayer) {
  return function GoogleTagManagerTarget(events) {
    events.forEach(event => dataLayer.push(event));
  };
}

module.exports = { GoogleTagManager };
