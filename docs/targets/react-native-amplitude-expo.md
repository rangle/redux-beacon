# React Native Amplitude with Expo

### Usage Instructions

1. Sign up for Amplitude if you haven't already, and
   [create a new project](https://amplitude.zendesk.com/hc/en-us/articles/207108137-Introduction-Getting-Started).

2. Take note of your [Amplitude API key](https://amplitude.zendesk.com/hc/en-us/articles/207108137-Introduction-Getting-Started#getting-started).

3. Create a new [Expo](https://expo.io/learn) project, or [use ExpoKit](https://docs.expo.io/versions/latest/guides/expokit.html) in your project.

4. Import the target, then provide it when creating the middleware:

   ```js
   import { Amplitude } from 'expo';
   import { AmplitudeExpo } from 'redux-beacon/targets/react-native';

   const target = AmplitudeExpo('YOUR_API_KEY', AmplitudeExpo);
   const analyticsMiddleware = createMiddleware(eventsMap, target);
   ```
