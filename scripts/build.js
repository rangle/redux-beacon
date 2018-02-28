/**
 * This script
 *   loops through each package
 *   transpiles the files under src/
 *   places the transpiled files in a newly created dist/ directory
 */

'use strict';

const babel = require('babel-core');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const mkdirp = require('mkdirp');

const BABEL_CONFIG = path.resolve(__dirname, '../.babelrc');
const BUILD_DIR = 'dist';
const IGNORE_PATTERN = '**/__{tests,mocks}__/**';
const JS_FILES_PATTERN = '**/*.js';
const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const SRC_DIR = 'src';

const babelConfig = JSON.parse(fs.readFileSync(BABEL_CONFIG, 'utf8'));

const packages = fs
  .readdirSync(PACKAGES_DIR)
  .map(dirName => path.resolve(PACKAGES_DIR, dirName));

packages.forEach(packagePath => {
  const buildDir = path.resolve(packagePath, BUILD_DIR);
  mkdirp.sync(buildDir);

  const filesToTransformGlob = path.resolve(
    packagePath,
    SRC_DIR,
    JS_FILES_PATTERN,
  );

  const filesToTransform = glob.sync(filesToTransformGlob, {
    ignore: IGNORE_PATTERN,
  });

  filesToTransform.forEach(filePath => {
    const transformedFile = babel.transformFileSync(filePath, babelConfig).code;
    const newPath = path.resolve(buildDir, path.basename(filePath));
    fs.writeFileSync(newPath, transformedFile);
  });
});
