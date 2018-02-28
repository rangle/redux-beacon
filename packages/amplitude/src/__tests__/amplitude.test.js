import { Amplitude } from '../';
import amplitudeSDKMock, { resetAllMocks } from './amplitude.mocks';

window.amplitude = amplitudeSDKMock;

afterEach(() => {
  resetAllMocks();
});

it('does not call any service when hitType is undefined', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: undefined,
    },
  ];

  Amplitude()(events);

  Object.keys(app).forEach(key => {
    expect(app[key]).not.toHaveBeenCalled();
  });
});

it('sets a user id when the setUserId hitType is specified', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: 'setUserId',
      userId: 42,
    },
  ];

  Amplitude()(events);

  expect(app.setUserId).toHaveBeenCalledWith(events[0].userId);
});

it('sets user props when the setUserProperties hitType is specified', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: 'setUserProperties',
      userProperties: {
        gender: 'male',
      },
    },
  ];

  Amplitude()(events);

  expect(app.setUserProperties).toHaveBeenCalledWith(events[0].userProperties);
});

it('clears props when the clearUserProperties hitType is specified', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: 'clearUserProperties',
    },
  ];

  Amplitude()(events);

  expect(app.clearUserProperties).toHaveBeenCalled();
});

it('logs an event when the logEvent hitType is specified', () => {
  const app = window.amplitude.getInstance();

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

  expect(app.logEvent).toHaveBeenCalledWith(events[0].eventType, undefined);
  expect(app.logEvent).toHaveBeenCalledWith(
    events[1].eventType,
    events[1].eventProperties
  );
});

it('sets group info when the setGroup hitType is specified', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: 'setGroup',
      groupType: 'orgId',
      groupName: 15,
    },
  ];

  Amplitude()(events);

  expect(app.setGroup).toHaveBeenCalledWith(
    events[0].groupType,
    events[0].groupName
  );
});

it('resets deviceId when the regenerateDeviceId hitType is specified', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: 'regenerateDeviceId',
    },
  ];

  Amplitude()(events);

  expect(app.regenerateDeviceId).toHaveBeenCalled();
});

it('stops tracking when the setOptOut hitType is specified', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: 'setOptOut',
    },
  ];

  Amplitude()(events);

  expect(app.setOptOut).toHaveBeenCalled();
});

it('sets version name when the setVersionName hitType is specified', () => {
  const app = window.amplitude.getInstance();

  const events = [
    {
      hitType: 'setVersionName',
      versionName: '1.12.3',
    },
  ];

  Amplitude()(events);

  expect(app.setVersionName).toHaveBeenCalledWith(events[0].versionName);
});

it('builds an identity when the identify hitType is specified', () => {
  const app = window.amplitude.getInstance();
  const identity = new window.amplitude.Identify();

  const events = [
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

  Object.keys(events[0].set).forEach(k => {
    expect(identity.set).toHaveBeenCalledWith(k, events[0].set[k]);
  });
  Object.keys(events[0].setOnce).forEach(k => {
    expect(identity.setOnce).toHaveBeenCalledWith(k, events[0].setOnce[k]);
  });
  events[0].unset.forEach(k => {
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
  expect(app.identify).toHaveBeenCalled();
});

it('tracks revenue when the logRevenueV2 hitType is specified', () => {
  const app = window.amplitude.getInstance();
  const revenue = new window.amplitude.Revenue();

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

  expect(revenue.setProductId).toHaveBeenCalledWith(events[0].productId);
  expect(revenue.setPrice).toHaveBeenCalledWith(events[0].price);
  expect(revenue.setQuantity).toHaveBeenCalledWith(events[0].quantity);
  expect(revenue.setRevenueType).toHaveBeenCalledWith(events[0].revenueType);
  expect(revenue.setEventProperties).toHaveBeenCalledWith(
    events[0].eventProperties
  );
  expect(app.logRevenueV2).toHaveBeenCalled();
});

it('uses options.instance when provided', () => {
  const app = window.amplitude.getInstance();

  const instance = {
    setUserId: jest.fn(),
    setUserProperties: jest.fn(),
    clearUserProperties: jest.fn(),
    logEvent: jest.fn(),
    setGroup: jest.fn(),
    regenerateDeviceId: jest.fn(),
    setOptOut: jest.fn(),
    setVersionName: jest.fn(),
  };

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

  const target = Amplitude({ instance });
  target(events);

  Object.keys(instance).forEach(key => {
    expect(instance[key]).toHaveBeenCalled();
  });

  Object.keys(app).forEach(key => {
    expect(app[key]).not.toHaveBeenCalled();
  });
});
