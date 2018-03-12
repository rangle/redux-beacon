import { AmplitudeOptions } from './types';

declare let amplitude: any;

/**
 * Creates the Amplitude target
 */
const Amplitude = (options?: AmplitudeOptions) => (events: any[]) => {
  if (!window || !(window as any).amplitude) {
    return;
  }

  const app = (options && options.instance) || amplitude.getInstance();

  let identity: any;
  let revenue: any;

  events.forEach(event => {
    switch (event.hitType) {
      case 'setUserId':
        app.setUserId(event.userId);
        break;
      case 'setUserProperties':
        app.setUserProperties(event.userProperties);
        break;
      case 'clearUserProperties':
        app.clearUserProperties();
        break;
      case 'logEvent':
        app.logEvent(event.eventType, event.eventProperties);
        break;
      case 'setGroup':
        app.setGroup(event.groupType, event.groupName);
        break;
      case 'regenerateDeviceId':
        app.regenerateDeviceId();
        break;
      case 'setOptOut':
        app.setOptOut(event.optOut || true);
        break;
      case 'setVersionName':
        app.setVersionName(event.versionName);
        break;
      case 'identify':
        identity = new amplitude.Identify();

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

        app.identify(identity);
        break;
      case 'logRevenueV2':
        revenue = new amplitude.Revenue();

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

        app.logRevenueV2(revenue);
        break;
      default:
        break;
    }
  });
};

export default Amplitude;
