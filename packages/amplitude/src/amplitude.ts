import {
  Identify,
  identify,
  logEvent,
  Revenue,
  revenue as logRevenue,
  setDeviceId,
  setGroup,
  setOptOut,
  setUserId,
} from '@amplitude/analytics-browser';
import { createDeviceId } from '@amplitude/analytics-browser/lib/cjs/config';
/**
 * Creates the Amplitude target
 */
const Amplitude = () => (events: any[]) => {
  if (!window) {
    return;
  }

  let revenue: any;

  events.forEach(event => {
    switch (event.hitType) {
      case 'setUserId': {
        setUserId(event.userId);
        break;
      }
      case 'setUserProperties': {
        if (event.userProperties) {
          const identity = new Identify();
          Object.entries(event.userProperties).forEach(([k, v]) =>
            identity.set(k, v as any)
          );
          identify(identity);
        }
        break;
      }
      case 'clearUserProperties': {
        const identity = new Identify();
        identity.clearAll();
        identify(identity);
        break;
      }
      case 'logEvent': {
        logEvent(event.eventType, event.eventProperties);
        break;
      }
      case 'setGroup': {
        setGroup(event.groupType, event.groupName);
        break;
      }
      case 'regenerateDeviceId': {
        setDeviceId(createDeviceId());
        break;
      }
      case 'setOptOut': {
        setOptOut(event.optOut || true);
        break;
      }
      case 'setVersionName': {
        const identity = new Identify();
        identity.set('version_name', event.versionName);
        identify(identity);
        break;
      }
      case 'identify': {
        const identity = new Identify();

        Object.keys(event).forEach(op => {
          const args = event[op];

          switch (op) {
            case 'set':
              Object.keys(args).forEach(key => {
                const value = args[key];

                identity.set(key, value);
              });
              break;
            case 'setOnce':
              Object.keys(args).forEach(key => {
                const value = args[key];

                identity.setOnce(key, value);
              });
              break;
            case 'unset':
              args.forEach((key: string) => {
                identity.unset(key);
              });
              break;
            case 'add':
              Object.keys(args).forEach(key => {
                const value = args[key];

                identity.add(key, value);
              });
              break;
            case 'append':
              Object.keys(args).forEach(key => {
                const value = args[key];

                identity.append(key, value);
              });
              break;
            case 'prepend':
              Object.keys(args).forEach(key => {
                const value = args[key];

                identity.prepend(key, value);
              });
              break;
            default:
              break;
          }
        });

        identify(identity);
        break;
      }
      case 'logRevenueV2':
        revenue = new Revenue();

        Object.keys(event).forEach(attr => {
          const val = event[attr];

          switch (attr) {
            case 'productId':
              revenue.setProductId(val);
              break;
            case 'price':
              revenue.setPrice(val);
              break;
            case 'quantity':
              revenue.setQuantity(val);
              break;
            case 'revenueType':
              revenue.setRevenueType(val);
              break;
            case 'eventProperties':
              revenue.setEventProperties(val);
              break;
            default:
              break;
          }
        });

        logRevenue(revenue);
        break;
      default:
        break;
    }
  });
};

export default Amplitude;
