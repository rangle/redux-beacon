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

export default isEcommEvent;
