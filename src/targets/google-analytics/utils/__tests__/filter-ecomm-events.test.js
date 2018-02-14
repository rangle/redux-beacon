import { filterEcommEvents } from '../';

const [name, id, revenue] = ['fooname', 'fooid', 523.55];
const baseEvent = {
  hitType: 'addAction',
  customTrackerId: 'myTracker',
  ecommType: 'enhanced',
  actionName: 'click',
  id,
  name,
  revenue,
};

it('should return an object with unnecessary keys stripped out', () => {
  const result = filterEcommEvents(baseEvent);
  const expected = {
    id,
    name,
    revenue,
  };
  expect(result).toEqual(expected);
});
