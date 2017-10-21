const path = require('path');
const { tsTypesTester } = require('../../../utils/ts-types-tester');

tsTypesTester([path.join(__dirname, 'cordova-google-analytics.ts')]);
