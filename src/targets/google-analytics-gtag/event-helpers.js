export const trackPageView = (eventDefinition, ...trackers) => (
  action,
  prevState,
  nextState
) => {
  const { title, location, path } = eventDefinition(
    action,
    prevState,
    nextState
  );

  return {
    type: 'page',
    trackingId: trackers,
    page_title: title,
    page_location: location,
    page_path: path,
  };
};

export const trackEvent = eventDefinition => (action, prevState, nextState) => {
  const event = eventDefinition(action, prevState, nextState);

  return {
    type: 'event',
    action: event.action,
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  };
};
