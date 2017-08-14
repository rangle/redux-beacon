const filterEcommEvents = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (key !== 'hitType' && key !== 'customTrackerId') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const isEcommEvent = event => [
  'addTransaction',
  'addItem',
  'ecommSend',
  'ecommClear',
].indexOf(event.hitType) > -1;

module.exports = {
  filterEcommEvents,
  isEcommEvent,
};
