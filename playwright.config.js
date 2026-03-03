// @type {import('@playwright/test').PlaywrightTestConfig}
module.exports = {
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    trace: 'on-first-retry',
    // video recording for each test. Options: 'on', 'off', 'retain-on-failure'
    video: 'retain-on-failure',
    // directory to store test videos
    videoName: undefined,
    videos: 'reports/videos'
  },
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-report' }]]
};
