/**
 * A function that sends an event to amplitude
 */
export function Amplitude(events: any[]): void;

export type AmplitudeProp = string | number | null;

export interface SetUserId {
  hitType: 'setUserId';
  userId: AmplitudeProp;
}

export interface SetUserProperties {
  hitType: 'setUserProperties';
  userProperties: {
    [key: string]: AmplitudeProp | AmplitudeProp[];
  };
}

export interface ClearUserProperties {
  hitType: 'clearUserProperties';
}

export interface LogEvent {
  hitType: 'logEvent';
  eventType: string;
  eventProperties?: {
    [key: string]: AmplitudeProp;
  };
}

export interface SetGroup {
  hitType: 'setGroup';
  groupType: string;
  groupName: string;
}

export interface RegenerateDeviceId {
  hitType: 'regenerateDeviceId';
}

export interface SetOptOut {
  hitType: 'setOptOut';
  optOut?: boolean;
}

export interface SetVersionName {
  hitType: 'setVersionName';
  versionName: string;
}

export interface Identify {
  hitType: 'identity';
  set?: {
    [key: string]: AmplitudeProp | AmplitudeProp[];
  };
  setOnce?: {
    [key: string]: AmplitudeProp | AmplitudeProp[];
  };
  unset?: string[];
  add: {
    [key: string]: number;
  };
  append?: {
    [key: string]: AmplitudeProp | AmplitudeProp[];
  };
  prepend?: {
    [key: string]: AmplitudeProp | AmplitudeProp[];
  };
}

export interface LogRevenueV2 {
  hitType: 'logRevenueV2';
  productId: string;
  price: number;
  quantity: number;
  revenueType?: string
  eventProperties?: {
    [key: string]: any;
  }
}
