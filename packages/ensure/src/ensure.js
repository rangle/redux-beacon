const ensure = (isValid, eventDef) => (...args) => {
  const event = eventDef(...args);
  return isValid(event) ? event : null;
};

export default ensure;
