const filterEcommEvents = obj => {
  const newObj = {};
  const invalidKeys = ['hitType', 'customTrackerId', 'ecommType', 'actionName'];
  Object.keys(obj).forEach(key => {
    if (invalidKeys.indexOf(key) === -1) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const isEcommEvent = event =>
  [
    'addTransaction',
    'addItem',
    'addImpression',
    'addProduct',
    'addPromo',
    'addAction',
    'ecommSend',
    'ecommClear',
  ].indexOf(event.hitType) > -1;

module.exports = {
  filterEcommEvents,
  isEcommEvent,
};
