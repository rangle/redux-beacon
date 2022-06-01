import {
  identify,
  logEvent,
  revenue,
  setDeviceId,
  setGroup,
  setOptOut,
  setUserId,
} from '@amplitude/analytics-browser';
import Amplitude from '../';

jest.mock('@amplitude/analytics-browser', () => ({
  logEvent: jest.fn(),
  setUserId: jest.fn(),
  /* tslint:disable-next-line:max-classes-per-file */
  Identify: class {
    public add = jest.fn();
    public set = jest.fn();
    public setOnce = jest.fn();
    public unset = jest.fn();
    public append = jest.fn();
    public prepend = jest.fn();
    public clearAll = jest.fn();
  },
  /* tslint:disable-next-line:max-classes-per-file */
  Revenue: class {
    public setProductId = jest.fn();
    public setPrice = jest.fn();
    public setQuantity = jest.fn();
    public setRevenueType = jest.fn();
    public setEventProperties = jest.fn();
  },
  identify: jest.fn(),
  setGroup: jest.fn(),
  setOptOut: jest.fn(),
  revenue: jest.fn(),
  setDeviceId: jest.fn(),
}));

beforeEach(() => {});

afterEach(() => {
  jest.resetAllMocks();
});

it('does not call any service when hitType is undefined', () => {
  const events = [
    {
      hitType: undefined,
    },
  ];

  Amplitude()(events);
  expect(logEvent).not.toHaveBeenCalled();
  expect(identify).not.toHaveBeenCalled();
  expect(revenue).not.toHaveBeenCalled();
  expect(setDeviceId).not.toHaveBeenCalled();
  expect(setOptOut).not.toHaveBeenCalled();
  expect(setGroup).not.toHaveBeenCalled();
});

it('sets a user id when the setUserId hitType is specified', () => {
  const events = [
    {
      hitType: 'setUserId',
      userId: 42,
    },
  ];

  Amplitude()(events);

  expect(setUserId).toHaveBeenCalledWith(events[0].userId);
});

it('sets user props when the setUserProperties hitType is specified', () => {
  const events = [
    {
      hitType: 'setUserProperties',
      userProperties: {
        gender: 'male',
      },
    },
  ];

  Amplitude()(events);
  const identity = (identify as jest.Mock).mock.calls[0][0];
  expect(identity.set).toBeCalledWith('gender', 'male');
  expect(identify).toHaveBeenCalledWith(identity);
});

it('clears props when the clearUserProperties hitType is specified', () => {
  const events = [
    {
      hitType: 'clearUserProperties',
    },
  ];

  Amplitude()(events);
  const identity = (identify as jest.Mock).mock.calls[0][0];
  expect(identity.clearAll).toBeCalledWith();
  expect(identify).toHaveBeenCalledWith(identity);
});

it('logs an event when the logEvent hitType is specified', () => {
  const events = [
    {
      hitType: 'logEvent',
      eventType: 'New Banner – Exposure',
    },
    {
      hitType: 'logEvent',
      eventType: 'New Banner – Exposure',
      eventProperties: {
        company: 'Rangle.io',
        showText: false,
        color: 'blue',
      },
    },
  ];

  Amplitude()(events);

  expect(logEvent).toHaveBeenCalledWith(events[0].eventType, undefined);
  expect(logEvent).toHaveBeenCalledWith(
    events[1].eventType,
    events[1].eventProperties
  );
});

it('sets group info when the setGroup hitType is specified', () => {
  const events = [
    {
      hitType: 'setGroup',
      groupType: 'orgId',
      groupName: 15,
    },
  ];

  Amplitude()(events);

  expect(setGroup).toHaveBeenCalledWith(
    events[0].groupType,
    events[0].groupName
  );
});

it('resets deviceId when the regenerateDeviceId hitType is specified', () => {
  const events = [
    {
      hitType: 'regenerateDeviceId',
    },
  ];

  Amplitude()(events);

  expect(setDeviceId).toHaveBeenCalledWith(
    expect.stringMatching(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    )
  );
});

it('stops tracking when the setOptOut hitType is specified', () => {
  const events = [
    {
      hitType: 'setOptOut',
    },
  ];

  Amplitude()(events);

  expect(setOptOut).toHaveBeenCalled();
});

it('sets version name when the setVersionName hitType is specified', () => {
  const events = [
    {
      hitType: 'setVersionName',
      versionName: '1.12.3',
    },
  ];

  Amplitude()(events);
  const identity = (identify as jest.Mock).mock.calls[0][0];
  expect(identity.set).toHaveBeenCalledWith('version_name', '1.12.3');
  expect(identify).toHaveBeenCalledWith(identity);
});

it('builds an identity when the identify hitType is specified', () => {
  const events: any[] = [
    {
      hitType: 'identify',
      set: {
        gender: 'female',
        age: 30,
      },
      setOnce: {
        sign_up_date: '09/14/2015',
      },
      unset: ['gender', 'age'],
      add: {
        karma: 1,
        friends: 2,
      },
      append: {
        experiments: 'new-banner-test',
      },
      prepend: {
        clients: ['Aldo', 'JetBlue', 'Progressive', 'uniqlo'],
      },
    },
  ];

  Amplitude()(events);
  const identity = (identify as jest.Mock).mock.calls[0][0];
  Object.keys(events[0].set).forEach(k => {
    expect(identity.set).toHaveBeenCalledWith(k, events[0].set[k]);
  });
  Object.keys(events[0].setOnce).forEach(k => {
    expect(identity.setOnce).toHaveBeenCalledWith(k, events[0].setOnce[k]);
  });
  events[0].unset.forEach((k: any) => {
    expect(identity.unset).toHaveBeenCalledWith(k);
  });
  Object.keys(events[0].add).forEach(k => {
    expect(identity.add).toHaveBeenCalledWith(k, events[0].add[k]);
  });
  Object.keys(events[0].append).forEach(k => {
    expect(identity.append).toHaveBeenCalledWith(k, events[0].append[k]);
  });
  Object.keys(events[0].prepend).forEach(k => {
    expect(identity.prepend).toHaveBeenCalledWith(k, events[0].prepend[k]);
  });
  expect(identify).toHaveBeenCalled();
});

it('tracks revenue when the logRevenueV2 hitType is specified', () => {
  const events = [
    {
      hitType: 'logRevenueV2',
      productId: 'com.company.productId',
      price: 3.99,
      quantity: 3,
      revenueType: 'income',
      eventProperties: {
        cashier: 'Miguel Vesco',
      },
    },
  ];

  Amplitude()(events);
  const revenueInstance = (revenue as jest.Mock).mock.calls[0][0];
  expect(revenueInstance.setProductId).toHaveBeenCalledWith(
    events[0].productId
  );
  expect(revenueInstance.setPrice).toHaveBeenCalledWith(events[0].price);
  expect(revenueInstance.setQuantity).toHaveBeenCalledWith(events[0].quantity);
  expect(revenueInstance.setRevenueType).toHaveBeenCalledWith(
    events[0].revenueType
  );
  expect(revenueInstance.setEventProperties).toHaveBeenCalledWith(
    events[0].eventProperties
  );
  expect(revenue).toHaveBeenCalled();
});

it("does nothing if an amplitude instance isn't provided (either on window or as an option)", () => {
  (window as any).amplitude = undefined;

  const events = [
    { hitType: 'setUserId' },
    { hitType: 'setUserProperties' },
    { hitType: 'logEvent' },
    { hitType: 'clearUserProperties' },
    { hitType: 'setGroup' },
    { hitType: 'regenerateDeviceId' },
    { hitType: 'setOptOut' },
    { hitType: 'setVersionName' },
  ];

  const target = Amplitude();

  expect(() => target(events)).not.toThrow();
});
