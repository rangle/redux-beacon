function addTimestamp(events) {
  return events.map(event => Object.assign({}, event, { timeSaved: new Date() }));
}

module.exports = addTimestamp;
