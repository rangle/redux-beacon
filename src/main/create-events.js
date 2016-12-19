function createEvents(eventDefinitions, prevState, action) {
  const asArray = value => (Array.isArray(value) ? value : [value]);

  return asArray(eventDefinitions).map(({ eventName, eventFields, eventSchema }) => {
    const name = { event: eventName || action.type };
    const fields = typeof eventFields === 'function' ? eventFields(prevState, action) : {};

    const event = Object.assign(name, fields);

    if (eventSchema !== undefined) {
      const eventPropIsValid = prop => eventSchema[prop](event[prop]);
      const isValid = Object.keys(eventSchema).every(eventPropIsValid);
      if (isValid) {
        return event;
      }
      return `Schema validation failure for ${event.event}`;
    }

    return event;
  }).filter(event => typeof event !== 'string');
}

module.exports = createEvents;
