import { Segment } from '../';

window.analytics = {
  identify: jest.fn(),
  group: jest.fn(),
  page: jest.fn(),
  track: jest.fn(),
  alias: jest.fn(),
};
const target = Segment();

describe('Target: Segment.io', () => {
  it('does not call any service when hitType is undefined', () => {
    const events = [
      {
        hitType: undefined,
      },
    ];
    target(events);
    Object.keys(window.analytics).forEach(key => {
      expect(window.analytics[key]).not.toHaveBeenCalled();
    });
  });

  it('calls page service when hitType is pageview', () => {
    const events = [
      {
        hitType: 'pageview',
        page: 'random page',
      },
    ];
    target(events);
    expect(window.analytics.page).toHaveBeenCalledWith(events[0].page);
  });

  it('calls track service when hitType is event', () => {
    const events = [
      {
        hitType: 'event',
        eventAction: 'random event action',
      },
    ];
    target(events);
    expect(window.analytics.track).toHaveBeenCalledWith(
      events[0].eventAction,
      events[0]
    );
  });

  it('calls identify service when hitType is identify', () => {
    const events = [
      {
        hitType: 'identify',
        userId: 'random user id',
      },
    ];
    target(events);
    expect(window.analytics.identify).toHaveBeenCalledWith(
      events[0].userId,
      events[0]
    );
  });

  it('calls group service when hitType is group', () => {
    const events = [
      {
        hitType: 'group',
        groupId: 'random group id',
      },
    ];
    target(events);
    expect(window.analytics.group).toHaveBeenCalledWith(
      events[0].groupId,
      events[0]
    );
  });

  it('calls alias service when hitType is alias', () => {
    const events = [
      {
        hitType: 'alias',
        userId: 'random user id',
      },
    ];
    target(events);
    expect(window.analytics.alias).toHaveBeenCalledWith(events[0].userId);
  });
});

describe('When Segment is not defined', () => {
  it('should throw an error informing the user.', () => {
    window.analytics = undefined;
    expect(() => target()).toThrowErrorMatchingSnapshot();
  });
});
