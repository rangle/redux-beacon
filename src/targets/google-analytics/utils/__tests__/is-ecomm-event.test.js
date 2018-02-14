import { isEcommEvent } from '../';

let events;

events = [
  { hitType: 'addTransaction', id: 'myid' },
  { hitType: 'addItem', id: 'myitemid', name: 'my item' },
  { hitType: 'addProduct', id: 'myitemid', name: 'my item' },
  { hitType: 'addImpression', id: 'myitemid', name: 'my item' },
  { hitType: 'addPromo', id: 'myitemid', name: 'my item' },
  { hitType: 'addAction', id: 'myitemid', name: 'my item' },
  { hitType: 'ecommClear' },
  { hitType: 'ecommSend' },
];
events.forEach(event => {
  test(`${JSON.stringify(event)} => true,`, () => {
    expect(isEcommEvent(event)).toBeTruthy();
  });
});

it('should return false if event hitType is not related to ecommerce', () => {
  events = [
    { hitType: 'pageview' },
    { hitType: 'screenview' },
    { hitType: 'event' },
    { hitType: 'social' },
  ];
  events.forEach(evt => expect(isEcommEvent(evt)).toBeFalsy());
});
