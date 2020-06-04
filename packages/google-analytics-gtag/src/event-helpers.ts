import { EventDefinition } from 'redux-beacon';

export const trackPageView = (
  eventDef: EventDefinition<{
    title?: string;
    location?: string;
    path?: string;
    fieldsObject?: {
      [key: string]: any;
    };
  }>,
  ...trackers: string[]
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { title, location, path, fieldsObject = {} } = event;
  return {
    type: 'page',
    trackingId: trackers,
    page_title: title,
    page_location: location,
    page_path: path,
    ...fieldsObject,
  };
};

export const trackEvent = (
  eventDef: EventDefinition<{
    category: string;
    action: string;
    label?: string;
    value?: number;
    fieldsObject?: {
      [ket: string]: any;
    };
  }>
): EventDefinition => (action, prevState, nextState) => {
  const event = eventDef(action, prevState, nextState);
  const { category, label, value, fieldsObject = {} } = event;

  return {
    type: 'event',
    action: event.action,
    event_category: category,
    event_label: label,
    value,
    ...fieldsObject,
  };
};
