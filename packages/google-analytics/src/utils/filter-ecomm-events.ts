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

export default filterEcommEvents;
