export interface Traits {
  address?: {
    city?: string;
    country?: string;
    postalCode?: string;
    state?: string;
    street?: string;
  };
  age?: number;
  avatar?: string;
  birthday?: string;
  company?: {
    name?: string;
    id?: string | number;
    industry?: string;
    employee_count?: number;
    plan?: string;
  };
  createdAt?: string;
  description?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  id?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  title?: string;
  username?: string;
  website?: string;
}

export interface IdentifyEvent {
  hitType: 'identify';
  userId: string;
  traits: any;
}

export interface GroupEvent {
  hitType: 'group';
  groupId: string;
  traits: any;
}

export interface PageViewEvent {
  hitType: 'pageview';
  name: string;
  properties: any;
}

export interface EventEvent {
  hitType: 'event';
  properties?: any;
  eventAction: string;
}

export interface AliasEvent {
  hitType: 'alias';
  userId: string;
}

export interface ResetEvent {
  hitType: 'reset';
}

export type Event = IdentifyEvent | GroupEvent | PageViewEvent | EventEvent | AliasEvent | ResetEvent;
