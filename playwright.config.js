const {defineConfig, devices} = require('@playwright/test');
require('dotenv').config();
import {Utils} from './helpers/Utils';

module.exports = defineConfig({
  reporter: [['html', {open: process.env.CI ? 'never' : 'always'}]],

  testDir: './tests',
  /* Timeout for the test and for assertion */
  timeout: 150000,
  expect: {
    timeout: 30000,
  },
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  // /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || Utils.getEnvironment().envBaseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {name: 'setup', testMatch: /.*\.setup\.js/},
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 1280, height: 720},
        locale: 'en-GB',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {width: 1280, height: 720},
        locale: 'en-GB',
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: {width: 1280, height: 720},
        locale: 'en-GB',
      },
      dependencies: ['setup'],
    },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 1280, height: 720},
        locale: 'en-GB',
        channel: 'chrome',
      },
      dependencies: ['setup'],
    },
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        viewport: {width: 1280, height: 720},
        locale: 'en-GB',
        channel: 'msedge',
      },
      dependencies: ['setup'],
    },
    /* Test against mobile viewports. */
  ],
  /* Run your local dev server before starting the tests */
});
