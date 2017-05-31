const ensure = (isValid, eventDef) => (...args) => {
  const event = eventDef(...args);
  return isValid(event) ? event : null;
};

module.exports = { ensure };
