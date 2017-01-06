import {
  GoogleTagManager,
} from '../../../../src/targets/react-native/google-tag-manager';

const trackingId = 'UX-XXXXXX';
const GTMBridge = {};

GoogleTagManager(trackingId, GTMBridge);
