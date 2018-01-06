export function AmplitudeExpo(apiKey, Amplitude) {
  Amplitude.initialize(apiKey);
  return function AmplitudeExpoTarget(events) {
    events.forEach(targetEvent => {
      const properties = Object.keys(targetEvent)
        .filter(key => key !== 'event')
        .reduce((result, key) => (result[key] = obj[key], result), {});

      Amplitude.logEventWithProperties(targetEvent.event, properties);
    });
  };
}
