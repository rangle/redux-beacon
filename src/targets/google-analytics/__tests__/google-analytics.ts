import {
  GoogleAnalytics,
  PageView,
  Event,
  UserTiming,
  SocialInteraction,
  Exception,
} from '../';
import { Target } from '../../../../';

let gaTarget: Target;

gaTarget = GoogleAnalytics();

const pageView = (): PageView => ({
  hitType: 'pageview',
  page: '/home',
  title: 'homepage',
  location: 'https://some.site/home',
});

const event = (): Event => ({
  hitType: 'event',
  eventCategory: 'category',
  eventAction: 'action',
  eventLabel: 'label',
  eventValue: 3,
});

const userTiming = (): UserTiming => ({
  hitType: 'timing',
  timingCategory: 'category',
  timingVar: 'variable',
  timingValue: 20,
  timingLabel: 'label',
});

const socialInteraction = (): SocialInteraction => ({
  hitType: 'social',
  socialNetwork: 'network',
  socialAction: 'action',
  socialTarget: 'target',
});

const exception = (): Exception => ({
  hitType: 'exception',
  exDescription: 'descrption',
  exFatal: false,
});
