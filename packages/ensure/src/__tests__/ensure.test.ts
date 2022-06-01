import * as joi from 'joi';
import ensure from '../ensure';

const hasShape = (event: any, shape: joi.ObjectSchema<any>) =>
  !shape.validate(event).error;

const isValidPageView = (event) =>
  hasShape(
    event,
    joi.object({
      hitType: joi.string().allow('pageview').only().required(),
      route: joi.string().disallow('/404'),
      referrer: joi.string(),
    })
  );

const pageView = (action, prevState) => ({
  hitType: 'pageview',
  route: action.payload.location.pathname,
  referrer: prevState.currentRoute,
});

test('passing validator', () => {
  const action = { payload: { location: { pathname: '/home' } } };
  const prevState = { currentRoute: '/' };

  expect(
    ensure(isValidPageView, pageView)(action, prevState, prevState)
  ).toEqual({
    hitType: 'pageview',
    route: '/home',
    referrer: '/',
  });
});

test('failing validator', () => {
  const action = { payload: { location: { pathname: '/404' } } };
  const prevState = { currentRoute: '/' };

  expect(
    ensure(isValidPageView, pageView)(action, prevState, prevState)
  ).toEqual(null);
});
