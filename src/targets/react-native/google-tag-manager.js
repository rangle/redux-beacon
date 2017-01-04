import { GoogleTagManager } from 'react-native-google-analytics-bridge';

function ReactNativeGoogleTagManager (events) {
  events.forEach((event) => {
    const eventToPush = (() => {
      if (event.event === undefined && event.hitType !== undefined) {
        return Object.assign({}, event, {event: event.hitType});
      }
      return event;
    })();
    GoogleTagManager.pushDataLayerEvent(eventToPush)
  });
}

module.exports = { ReactNativeGoogleTagManager };
