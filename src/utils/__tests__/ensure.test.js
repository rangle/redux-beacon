const joi = require('joi');
const { ensure } = require('../');

const hasShape = (event, shape) =>
  !joi.validate(event, joi.object().keys(shape)).error;

const isValidPageView = event =>
  hasShape(event, {
    hitType: joi.string().only('pageview').required(),
    route: joi.string().disallow('/404'),
    referrer: joi.string(),
  });

const pageView = (action, prevState) => ({
  hitType: 'pageview',
  route: action.payload.location.pathname,
  referrer: prevState.currentRoute,
});

test('passing validator', () => {
  const action = { payload: { location: { pathname: '/home' } } };
  const prevState = { currentRoute: '/' };

  expect(ensure(isValidPageView, pageView)(action, prevState)).toEqual({
    hitType: 'pageview',
    route: '/home',
    referrer: '/',
  });
});

test('failing validator', () => {
  const action = { payload: { location: { pathname: '/404' } } };
  const prevState = { currentRoute: '/' };

  expect(ensure(isValidPageView, pageView)(action, prevState)).toEqual(null);
});
