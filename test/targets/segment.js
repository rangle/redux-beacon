const { segment } = require('../../src/targets/segment');

describe('segment target', () => {
  window.analytics = {
    identify: jest.fn(),
    group: jest.fn(),
    page: jest.fn(),
    track: jest.fn(),
    alias: jest.fn(),
  };

  it('Should not call any service when hitType is undefined', () => {
    const events = [{
      hitType: undefined,
    }];
    segment(events);
    Object.keys(window.analytics).forEach((key) => {
      expect(window.analytics[key]).not.toHaveBeenCalled();
    });
  });

  it('Calls page service when hitType is pageview', () => {
    const events = [{
      hitType: 'pageview',
      page: 'random page',
    }];
    segment(events);
    expect(window.analytics.page).toHaveBeenCalledWith(events[0].page);
  });

  it('Calls track service when hitType is event', () => {
    const events = [{
      hitType: 'event',
      eventAction: 'random event action',
    }];
    segment(events);
    expect(window.analytics.track).toHaveBeenCalledWith(events[0].eventAction, events[0]);
  });

  it('Calls identify service when hitType is identify', () => {
    const events = [{
      hitType: 'identify',
      userId: 'random user id',
    }];
    segment(events);
    expect(window.analytics.identify).toHaveBeenCalledWith(events[0].userId, events[0]);
  });

  it('Calls group service when hitType is group', () => {
    const events = [{
      hitType: 'group',
      groupId: 'random group id',
    }];
    segment(events);
    expect(window.analytics.group).toHaveBeenCalledWith(events[0].groupId, events[0]);
  });

  it('Calls alias service when hitType is alias', () => {
    const events = [{
      hitType: 'alias',
      userId: 'random user id',
    }];
    segment(events);
    expect(window.analytics.alias).toHaveBeenCalledWith(events[0].userId);
  });
});
