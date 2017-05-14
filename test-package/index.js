const path = require('path');
const readFile = require('fs').readFileSync;
const run = require('child_process').execSync;
const childProcess = require('child_process');
const log = console.log;
const baseDir = process.cwd();

log('packaging redux beacon...');
run('npm pack');

log('getting path to package...');
const pkg = JSON.parse(readFile('./package.json'));
const pkgName = `${pkg.name}-${pkg.version}.tgz`;
const pkgPath = path.resolve(pkgName);

log('making temp dir for running tests in...');
const TEMP_TEST_DIR = '/tmp/redux-beacon-test';
run(`mkdir ${TEMP_TEST_DIR}`);

log('copying the tests to the temp dir...');
const testsJS = path.join(__dirname, 'tests.js');
run(`cp ${testsJS} ${TEMP_TEST_DIR}`);

process.chdir(TEMP_TEST_DIR);
log('installing redux beacon in temp dir...');
run(`npm install ${pkgPath} --silent`);
process.chdir(baseDir);

log('running tests...');
try {
  require(`${TEMP_TEST_DIR}/tests.js`);
  log('All Tests Have Passed');
} catch (err) {
  log('Test Failed');
  log(err.stack);
} finally {
  log('deleting temp test dir...');
  run(`rm -r ${TEMP_TEST_DIR}`);
  log(`deleting ${pkgName}`);
  run(`rm ${pkgPath}`);
}
