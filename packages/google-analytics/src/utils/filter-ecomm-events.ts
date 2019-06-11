import { removeKeys } from './remove-keys';

const filterEcommEvents = (ecommEvent: {
  [key: string]: any;
}): { [key: string]: any } =>
  removeKeys(ecommEvent, [
    'hitType',
    'customTrackerId',
    'ecommType',
    'actionName',
  ]);

export default filterEcommEvents;
