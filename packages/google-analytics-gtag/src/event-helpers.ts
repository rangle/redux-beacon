import { EventDefinition } from 'redux-beacon';

export const trackPageView = (
  eventDef: EventDefinition<{
    title?: string;
    location?: string;
    path?: string;
  }>,
  ...trackers: string[]
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);

  return {
    type: 'page',
    trackingId: trackers,
    page_title: event.title,
    page_location: event.location,
    page_path: event.path,
  };
};

export const trackEvent = (
  eventDef: EventDefinition<{
    category: string;
    action: string;
    label?: string;
    value?: number;
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);

  return {
    type: 'event',
    action: event.action,
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  };
};
