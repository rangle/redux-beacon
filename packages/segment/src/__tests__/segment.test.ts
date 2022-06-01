import Segment from '../';

window.analytics = {
  identify: jest.fn(),
  group: jest.fn(),
  page: jest.fn(),
  track: jest.fn(),
  alias: jest.fn(),
} as any;
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
    expect(window.analytics.track).toHaveBeenCalledWith(
      events[0].eventAction,
      {
        data: 'example',
      },
      undefined
    );
  });
});

describe('When Segment is not defined', () => {
  it('should throw an error informing the user.', () => {
    window.analytics = undefined;
    // @ts-expect-error expected to send incorrect args
    expect(() => target()).toThrowErrorMatchingSnapshot();
  });
});
