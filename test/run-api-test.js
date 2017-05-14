const path = require('path');
const readFile = require('fs').readFileSync;
const run = require('child_process').execSync;

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
const testsJS = path.join(__dirname, 'api.js');
const testsTS = path.join(__dirname, 'api.ts');
const tsConfig = path.join(__dirname, 'tsconfig.json');
run(`cp ${testsJS} ${testsTS} ${tsConfig} ${TEMP_TEST_DIR}`);

process.chdir(TEMP_TEST_DIR);
log('installing redux beacon in temp dir...');
run(`npm install ${pkgPath} --silent`);
log('installing tests dependencies...');
run('npm install typescript --silent');
run('npm install typings-tester --silent');
process.chdir(baseDir);

log('running tests...');
try {
  require(`${TEMP_TEST_DIR}/api.js`);
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
