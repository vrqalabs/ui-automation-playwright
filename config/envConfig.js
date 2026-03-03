const environments = require('./environments');
const path = require('path');

/**
 * Determine the active environment based on a CLI argument or
 * environment variable. Defaults to 'dev'.
 *
 * Usage:
 *   EXPORT ENV=stage               (for Unix-like)
 *   set ENV=stage                   (Windows CMD)
 *   npx playwright test --env=dev   (custom CLI option)
 */
function getActiveEnv() {
  // priority: CLI argument --env=<value> > process.env.ENV > default
  const arg = process.argv.find(a => a.startsWith('--env='));
  if (arg) {
    return arg.split('=')[1];
  }
  if (process.env.ENV) {
    return process.env.ENV;
  }
  return 'stage'
}

function getConfig() {
  const env = getActiveEnv();
  if (!environments[env]) {
    throw new Error(`Unknown environment "${env}"`);
  }
  const cfg = environments[env];
  // attach absolute path for test data file
  cfg.testDataPath = path.join(__dirname, '../tests/fixtures', cfg.testDataFile);
  // determine browser selection (default to chrome/chromium)
  const browserArg = process.argv.find(a => a.startsWith('--browser='));
  if (browserArg) {
    cfg.browser = browserArg.split('=')[1];
  } else if (process.env.BROWSER) {
    cfg.browser = process.env.BROWSER;
  } else {
    cfg.browser = 'chromium'; // Playwright uses 'chromium' for Chrome-based
  }
  return cfg;
}

module.exports = { getActiveEnv, getConfig };
