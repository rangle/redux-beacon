const assert = require('assert');
const path = require('path');
const { check } = require('typings-tester');

[
  ['redux-beacon', 'createMiddleware', 'createMetaReducer', 'createEvents'],
  ['redux-beacon/targets/google-analytics', 'GoogleAnalytics'],
  ['redux-beacon/targets/google-tag-manager', 'GoogleTagManager'],
  ['redux-beacon/targets/segment', 'Segment'],
  ['redux-beacon/targets/amplitude', 'Amplitude'],
  ['redux-beacon/targets/react-native', 'GoogleAnalytics', 'GoogleTagManager'],
  ['redux-beacon/targets/cordova-google-analytics', 'CordovaGoogleAnalytics'],
  ['redux-beacon/extensions/logger', 'logger'],
  ['redux-beacon/extensions/offline-web', 'offlineWeb'],
  ['redux-beacon/extensions/offline-react-native', 'offlineReactNative'],
  ['redux-beacon/utils', 'ensure'],
].forEach((routes) => {
  const base = routes.splice(0, 1)[0];
  assert.doesNotThrow(() => require(base), base);
  routes.forEach(route => assert.ok(require(base)[route], `${base}.${route}`));
});

const tsFile = path.join(__dirname, 'api.ts');
const tsConfigFile = path.join(__dirname, 'tsconfig.json');
check([tsFile], tsConfigFile);
