const {
  Amplitude,
} = require('../../src/targets/amplitude');

describe('Target: Amplitude', () => {
  const instanceMock = {
    setUserId: jest.fn(),
    setUserProperties: jest.fn(),
    clearUserProperties: jest.fn(),
    logEvent: jest.fn(),
    setGroup: jest.fn(),
    regenerateDeviceId: jest.fn(),
    setOptOut: jest.fn(),
    setVersionName: jest.fn(),
    identify: jest.fn(),
    logRevenueV2: jest.fn(),
  };
  const identityMock = {
    add: jest.fn(),
    set: jest.fn(),
    setOnce: jest.fn(),
    unset: jest.fn(),
    append: jest.fn(),
    prepend: jest.fn(),
  };
  const revenueMock = {
    setProductId: jest.fn(),
    setPrice: jest.fn(),
    setQuantity: jest.fn(),
    setRevenueType: jest.fn(),
    setEventProperties: jest.fn(),
  };

  window.amplitude = {
    getInstance: () => instanceMock,
    Identify: () => identityMock,
    Revenue: () => revenueMock,
    logRevenueV2: jest.fn(),
  };

  it('does not call any service when hitType is undefined', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: undefined,
    }];

    Amplitude(evts);

    Object.keys(app).forEach((key) => {
      expect(app[key]).not.toHaveBeenCalled();
    });
  });

  it('sets a user id when the setUserId hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'setUserId',
      userId: 42,
    }];

    Amplitude(evts);

    expect(app.setUserId).toHaveBeenCalledWith(evts[0].userId);
  });

  it('sets user props when the setUserProperties hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'setUserProperties',
      userProperties: {
        gender: 'male',
      },
    }];

    Amplitude(evts);

    expect(app.setUserProperties).toHaveBeenCalledWith(evts[0].userProperties);
  });

  it('clears props when the clearUserProperties hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'clearUserProperties',
    }];

    Amplitude(evts);

    expect(app.clearUserProperties).toHaveBeenCalled();
  });

  it('logs an event when the logEvent hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'logEvent',
      eventType: 'New Banner – Exposure',
    }, {
      hitType: 'logEvent',
      eventType: 'New Banner – Exposure',
      eventProperties: {
        company: 'Rangle.io',
        showText: false,
        color: 'blue',
      },
    }];

    Amplitude(evts);

    expect(app.logEvent).toHaveBeenCalledWith(evts[0].eventType, undefined);
    expect(app.logEvent).toHaveBeenCalledWith(
      evts[1].eventType,
      evts[1].eventProperties
    );
  });

  it('sets group info when the setGroup hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'setGroup',
      groupType: 'orgId',
      groupName: 15,
    }];

    Amplitude(evts);

    expect(app.setGroup).toHaveBeenCalledWith(
      evts[0].groupType,
      evts[0].groupName,
    );
  });

  it('resets deviceId when the regenerateDeviceId hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'regenerateDeviceId',
    }];

    Amplitude(evts);

    expect(app.regenerateDeviceId).toHaveBeenCalled();
  });

  it('stops tracking when the setOptOut hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'setOptOut',
    }];

    Amplitude(evts);

    expect(app.setOptOut).toHaveBeenCalled();
  });

  it('sets version name when the setVersionName hitType is specified', () => {
    const app = window.amplitude.getInstance();

    const evts = [{
      hitType: 'setVersionName',
      versionName: '1.12.3',
    }];

    Amplitude(evts);

    expect(app.setVersionName).toHaveBeenCalledWith(evts[0].versionName);
  });

  it('builds an identity when the identify hitType is specified', () => {
    const app = window.amplitude.getInstance();
    const identity = new window.amplitude.Identify();

    const evts = [{
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
    }];

    Amplitude(evts);

    Object.keys(evts[0].set).forEach((k) => {
      expect(identity.set).toHaveBeenCalledWith(k, evts[0].set[k]);
    });
    Object.keys(evts[0].setOnce).forEach((k) => {
      expect(identity.setOnce).toHaveBeenCalledWith(k, evts[0].setOnce[k]);
    });
    evts[0].unset.forEach((k) => {
      expect(identity.unset).toHaveBeenCalledWith(k);
    });
    Object.keys(evts[0].add).forEach((k) => {
      expect(identity.add).toHaveBeenCalledWith(k, evts[0].add[k]);
    });
    Object.keys(evts[0].append).forEach((k) => {
      expect(identity.append).toHaveBeenCalledWith(k, evts[0].append[k]);
    });
    Object.keys(evts[0].prepend).forEach((k) => {
      expect(identity.prepend).toHaveBeenCalledWith(k, evts[0].prepend[k]);
    });
    expect(app.identify).toHaveBeenCalled();
  });

  it('tracks revenue when the logRevenueV2 hitType is specified', () => {
    const app = window.amplitude.getInstance();
    const revenue = new window.amplitude.Revenue();

    const evts = [{
      hitType: 'logRevenueV2',
      productId: 'com.company.productId',
      price: 3.99,
      quantity: 3,
      revenueType: 'income',
      eventProperties: {
        cashier: 'Miguel Vesco',
      },
    }];

    Amplitude(evts);

    expect(revenue.setProductId).toHaveBeenCalledWith(evts[0].productId);
    expect(revenue.setPrice).toHaveBeenCalledWith(evts[0].price);
    expect(revenue.setQuantity).toHaveBeenCalledWith(evts[0].quantity);
    expect(revenue.setRevenueType).toHaveBeenCalledWith(evts[0].revenueType);
    expect(revenue.setEventProperties).toHaveBeenCalledWith(evts[0].eventProperties);
    expect(app.logRevenueV2).toHaveBeenCalled();
  });
});
