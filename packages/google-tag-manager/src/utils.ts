export const convertFromGoogleAnalyticsEventIfNeeded = event => {
  if (!event.event && event.hitType) {
    const { hitType, ...rest } = event;
    return {
      ...rest,
      event: hitType,
    };
  }
  return event;
};
