function arrify(value) {
  return Array.isArray(value) ? value : [value];
}

function createEvents(eventDefinitions, prevState, action) {
  const eventCollection = [];
  arrify(eventDefinitions).forEach(({ eventFields, eventSchema }) => {
    if (typeof eventFields !== 'function') {
      return null;
    }
    const events = arrify(eventFields(action, prevState)).map((event) => {
      if (eventSchema !== undefined && typeof event === 'object') {
        const eventPropIsValid = prop => eventSchema[prop](event[prop]);
        const isValidEvent = Object.keys(eventSchema).every(eventPropIsValid);
        return isValidEvent ? event : null;
      }

      return event;
    }).filter(event => event !== null && event !== undefined);

    return eventCollection.push(...events);
  });
  return eventCollection;
}

module.exports = createEvents;
