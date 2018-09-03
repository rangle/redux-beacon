import {
  trackEcommAction,
  trackEcommImpression,
  trackEcommProduct,
  trackEcommPromotion,
} from '../event-helpers';

describe('trackEcommImpression', () => {
  it(`throws an error if an "id" or "name" isn't provided`, () => {
    const eventDef = trackEcommImpression(() => ({}));

    expect(eventDef).toThrow();
  });
  it(`doesn't throw an error if given an "id"`, () => {
    const eventDef = trackEcommImpression(() => ({ id: 'id' }));

    expect(eventDef).not.toThrow();
  });
  it(`doesn't throw an error if given a "name"`, () => {
    const eventDef = trackEcommImpression(() => ({ name: 'name' }));

    expect(eventDef).not.toThrow();
  });
});

describe('trackEcommProduct', () => {
  it(`throws an error if an "id" or "name" isn't provided`, () => {
    const eventDef = trackEcommProduct(() => ({}));

    expect(eventDef).toThrow();
  });
  it(`doesn't throw an error if given an "id"`, () => {
    const eventDef = trackEcommProduct(() => ({ id: 'id' }));

    expect(eventDef).not.toThrow();
  });
  it(`doesn't throw an error if given a "name"`, () => {
    const eventDef = trackEcommProduct(() => ({ name: 'name' }));

    expect(eventDef).not.toThrow();
  });
});

describe('trackEcommPromotion', () => {
  it(`throws an error if an "id" or "name" isn't provided`, () => {
    const eventDef = trackEcommPromotion(() => ({}));

    expect(eventDef).toThrow();
  });
  it(`doesn't throw an error if given an "id"`, () => {
    const eventDef = trackEcommPromotion(() => ({ id: 'id' }));

    expect(eventDef).not.toThrow();
  });
  it(`doesn't throw an error if given a "name"`, () => {
    const eventDef = trackEcommPromotion(() => ({ name: 'name' }));

    expect(eventDef).not.toThrow();
  });
});

describe('trackEcommAction', () => {
  it(`requires the "id" field when tracking a purchase`, () => {
    const eventDef = trackEcommAction(() => ({ actionName: 'purchase' }));

    expect(eventDef).toThrow();
  });
  it(`requires the "id" field when tracking a refund`, () => {
    const eventDef = trackEcommAction(() => ({ actionName: 'refund' }));

    expect(eventDef).toThrow();
  });
  it(`does not require an "id" when tracking other action types`, () => {
    const eventDef = trackEcommAction(() => ({ actionName: 'something-else' }));

    expect(eventDef).not.toThrow();
  });
});
