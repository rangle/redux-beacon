'use strict';

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const REDUX_BEACON = 'redux-beacon';
const PATH_PACKAGES = path.resolve(__dirname, '../packages');
const PATH_REDUX_BEACON = path.resolve(PATH_PACKAGES, REDUX_BEACON);
const TESTS_PATTERN = '__tests__';

const runBuildScript = packagePath => {
  console.log(`...building ${path.basename(packagePath)}`);

  const buildProcess = child_process.spawnSync('yarn', ['build'], {
    cwd: packagePath,
    stdio: 'inherit',
  });

  if (buildProcess.status > 0) {
    process.exit(buildProcess.status);
  }
};

runBuildScript(PATH_REDUX_BEACON);

fs
  .readdirSync(PATH_PACKAGES)
  .filter(dirName => dirName !== REDUX_BEACON)
  .filter(dirName => dirName !== TESTS_PATTERN)
  .map(dirName => path.resolve(PATH_PACKAGES, dirName))
  .forEach(runBuildScript);
