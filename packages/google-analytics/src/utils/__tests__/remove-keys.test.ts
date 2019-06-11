import { removeKeys } from '../';

const [name, id, revenue] = ['fooname', 'fooid', 523.55];

const event = {
  hitType: 'addAction',
  customTrackerId: 'myTracker',
  ecommType: 'enhanced',
  actionName: 'click',
  id: 'fooid',
  name: 'fooname',
  revenue: 8878,
};

it('should return a new object with certain keys omitted', () => {
  const result = removeKeys(event, ['customTrackerId']);
  expect(result).toEqual({
    hitType: 'addAction',
    ecommType: 'enhanced',
    actionName: 'click',
    id: 'fooid',
    name: 'fooname',
    revenue: 8878,
  });
});
