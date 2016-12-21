function arrify(value) {
  return Array.isArray(value) ? value : [value];
}

function createEvents(eventDefinitions, prevState, action) {
  return arrify(eventDefinitions).map(({ eventFields, eventSchema }) => {
    if (typeof eventFields !== 'function') {
      return null;
    }

    const event = eventFields(action, prevState);

    if (eventSchema !== undefined) {
      const eventPropIsValid = prop => eventSchema[prop](event[prop]);
      const isValidEvent = Object.keys(eventSchema).every(eventPropIsValid);
      return isValidEvent ? event : null;
    }

    return event;
  }).filter(event => event !== null);
}

module.exports = createEvents;
