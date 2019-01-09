const path = require('path');
const execa = require('execa');
const log = require('logalot');
const writeFile = require('write');

const CIRCLE_SHA1 = process.env.CIRCLE_SHA1;
const CIRCLE_BRANCH = process.env.CIRCLE_BRANCH;
const NPM_TOKEN = process.env.NPM_TOKEN;
const GH_TOKEN = process.env.GH_TOKEN;
const GH_NAME = process.env.GH_NAME;
const GH_EMAIL = process.env.GH_EMAIL;

// This script is in charge of publishing redux-beacon
// packages based on commands found in commit messages.
// ---------------------------------------------------------------------------
(async () => {
  if (CIRCLE_BRANCH !== 'master') return;

  // e.g. '[redux-beacon.patch] Testing automated deploys'
  const lastCommitMessage = await getCommitMessage(CIRCLE_SHA1);
  // e.g. '[redux-beacon.patch]'
  const publishCommandInLastCommit = extractPublishCommand(lastCommitMessage);

  if (!publishCommandInLastCommit) {
    log.warn(
      'No publish command found on last commit. Nothing will be published.'
    );
    return;
  }

  // e.g. ['redux-beacon', 'patch']
  const [packageToPublish, versionType] = splitPublishCommand(
    publishCommandInLastCommit
  );

  // e.g. ~/Desktop/redux-beacon/packages/redux-beacon
  const packagePath = await getPathToPackage(packageToPublish);

  // ---------------------------------------------------------------------------

  log.info('Bump package to the next version');

  const newVersion = await execa.stdout('npm', ['version', versionType], {
    cwd: packagePath,
  });

  log.success(`${packageToPublish} bumped up to ${newVersion}`);

  // ---------------------------------------------------------------------------

  log.info('Register token to authenticate for npm publish');

  const npmrcPath = path.resolve(packagePath, '.npmrc');
  const npmAuth = `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`;

  await writeFile(npmrcPath, npmAuth);

  log.success('Authenticated!');

  // ---------------------------------------------------------------------------

  log.info('Publish package to npm');

  await execa('npm', ['publish'], { cwd: packagePath });

  log.success('published!');

  // ---------------------------------------------------------------------------

  log.info('Set Github username and email');

  await execa('git', ['config', 'user.email', GH_EMAIL]);
  await execa('git', ['config', 'user.name', GH_NAME]);

  log.success('Github user set!');

  // ---------------------------------------------------------------------------

  log.info("Committing the changes to the package's package.json");

  await execa('git', ['add', path.resolve(packagePath, 'package.json')]);

  const commitMsg = `Publish ${packageToPublish} ${newVersion}`;

  await execa('git', ['commit', '-m', commitMsg]);

  log.success('Changes committed!');

  // ---------------------------------------------------------------------------

  log.info('Adding a tag for the change');

  const tagName = `${packageToPublish}@${newVersion}`;

  await execa('git', ['tag', tagName]);

  log.success('Tag added!');

  // ---------------------------------------------------------------------------

  log.info('Push changes to remote');

  const ghAuthorizedUrl = `https://${GH_TOKEN}@github.com/rangle/redux-beacon.git`;

  // Push quietly to prevent showing the token in the log
  await execa('git', ['push', ghAuthorizedUrl, CIRCLE_BRANCH]);
  await execa('git', ['push', ghAuthorizedUrl, tagName]);

  log.success('The remote repository is up to date!');
})();

// Helper Functions

async function getCommitMessage(commitSha) {
  return await execa.stdout('git', ['log', '--format=%B', '-n 1', commitSha]);
}

function extractPublishCommand(commitMsg) {
  try {
    return commitMsg.match(/^\[[\w\-]+.(patch|minor|major)\]/)[0];
  } catch (err) {
    return '';
  }
}

function splitPublishCommand(publishCommand) {
  return publishCommand
    .replace('[', '')
    .replace(']', '')
    .split('.');
}

async function getPathToPackage(packageName) {
  const pwd = await execa.stdout('pwd');

  return path.resolve(pwd, 'packages', packageName);
}
