import {
  GoogleAnalytics,
  PageView,
  Event,
  UserTiming,
  SocialInteraction,
  Exception,
} from '../../../src/targets/google-analytics';

const target = GoogleAnalytics(() => {});

const eventDefPageView = {
  eventFields: (): PageView => ({
    hitType: 'pageview',
    page: '/home',
    title: 'homepage',
    location: 'https://some.site/home',
  }),
};

const eventDefEvent = {
  eventFields: (): Event => ({
    hitType: 'event',
    eventCategory: 'category',
    eventAction: 'action',
    eventLabel: 'label',
    eventValue: 3,
  }),
};

const eventDefUserTiming = {
  eventFields: (): UserTiming => ({
    hitType: 'timing',
    timingCategory: 'category',
    timingVar: 'variable',
    timingValue: 20,
    timingLabel: 'label',
  }),
};

const eventDefSocialInteraction = {
  eventFields: (): SocialInteraction => ({
    hitType: 'social',
    socialNetwork: 'network',
    socialAction: 'action',
    socialTarget: 'target',
  }),
};

const eventDefException = {
  eventFields: (): Exception => ({
    hitType: 'exception',
    exDescription: 'descrption',
    exFatal: false,
  }),
};
