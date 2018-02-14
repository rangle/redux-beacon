import {
  trackPageView,
  trackEvent,
  trackTiming,
  trackSocialInteraction,
  trackException,
  trackEcommItem,
  trackEcommTransaction,
  ecommSend,
  ecommClear,
  trackEcommImpression,
  trackEcommProduct,
  trackEcommPromotion,
  trackEcommAction,
} from '../event-helpers';

const hitTypesAndHelpersMapping = {
  pageview: trackPageView,
  event: trackEvent,
  timing: trackTiming,
  social: trackSocialInteraction,
  exception: trackException,
  addItem: trackEcommItem,
  addTransaction: trackEcommTransaction,
  addImpression: trackEcommImpression,
  addProduct: trackEcommProduct,
  addPromo: trackEcommPromotion,
  addAction: trackEcommAction,
};

beforeEach(() => {
  window.ga = jest.fn();
});

describe('Helpers should return correct hitTypes', () => {
  const emptyFunc = () => ({});

  Object.keys(hitTypesAndHelpersMapping).forEach(hitType => {
    const relevantHelper = hitTypesAndHelpersMapping[hitType];

    test(`${hitType} is observed`, () => {
      const result = relevantHelper(emptyFunc)();

      expect(result.hitType).toBe(hitType);
    });
  });

  describe(`ecommClear is observed`, () => {
    expect(ecommClear().hitType).toBe('ecommClear');
  });

  describe(`ecommSend is observed`, () => {
    expect(ecommSend().hitType).toBe('ecommSend');
  });
});
