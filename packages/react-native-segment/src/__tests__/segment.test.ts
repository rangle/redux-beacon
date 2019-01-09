import Segment from '../';

const SegmentAnalytics = {
  identify: jest.fn(),
  group: jest.fn(),
  page: jest.fn(),
  track: jest.fn(),
  alias: jest.fn(),
};
const target = Segment(SegmentAnalytics);

describe('Target: Segment.io', () => {
  it('does not call any service when hitType is undefined', () => {
    const events = [
      {
        hitType: undefined,
      },
    ];
    target(events);
    Object.keys(SegmentAnalytics).forEach(key => {
      expect(SegmentAnalytics[key]).not.toHaveBeenCalled();
    });
  });

  it('calls track service when hitType is event', () => {
    const events = [
      {
        hitType: 'event',
        eventAction: 'random event action',
        properties: {
          data: 'example',
        },
      },
    ];
    target(events);
    expect(SegmentAnalytics.track).toHaveBeenCalledWith(
      events[0].eventAction,
      {
        data: 'example',
      }
    );
  });
});
