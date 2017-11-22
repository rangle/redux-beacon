function addTimestamp(events) {
  return events.map(event =>
    Object.assign({}, event, { timeSaved: Date.now() })
  );
}

export default addTimestamp;
