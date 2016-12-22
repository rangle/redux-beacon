import {
  GoogleAnalytics,
  PageView,
  Event,
  UserTiming,
  SocialInteraction,
  Exception,
} from '../../../src/targets/google-analytics';

GoogleAnalytics([]);

const pageView = {
  eventFields: (): PageView => ({
    hitType: 'pageview',
    page: '/home',
    title: 'homepage',
    location: 'https://some.site/home',
  }),
};

const event = {
  eventFields: (): Event => ({
    hitType: 'event',
    eventCategory: 'category',
    eventAction: 'action',
    eventLabel: 'label',
    eventValue: 3,
  }),
};

const userTiming = {
  eventFields: (): UserTiming => ({
    hitType: 'timing',
    timingCategory: 'category',
    timingVar: 'variable',
    timingValue: 20,
    timingLabel: 'label',
  }),
};

const socialInteraction = {
  eventFields: (): SocialInteraction => ({
    hitType: 'social',
    socialNetwork: 'network',
    socialAction: 'action',
    socialTarget: 'target',
  }),
};

const exception = {
  eventFields: (): Exception => ({
    hitType: 'exception',
    exDescription: 'descrption',
    exFatal: false,
  }),
};
