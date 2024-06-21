/**
 * @file This file contains test helpers and fixtures for running end-to-end tests using Playwright.
 * It exports an object with test fixtures and helper functions that can be used in test files.
 * The fixtures include an e2eTest fixture for creating and using a test account, and a baseTest fixture
 * for common test setup.
 * The file also includes a function performSignup() for performing user authentication and storing session state.
 * @module base
 */

const base = require('@playwright/test');
const {PomManager} = require('../page-objects/PomManager');
const {Utils} = require('./Utils');
const fs = require('fs').promises;

import {faker} from '@faker-js/faker';

/**
 * e2eTest fixture for creating and using a test account.
 * @type {import('@playwright/test').TestFixtures<{firstName: string, lastName: string, email: string, role: string, password: string, randomInt: string, stateFilePath: string}>}
 */
exports.e2eTest = base.test.extend({
  account: [
    async ({browser}, use) => {
      const randomInt = `${faker.number.int({min: 1000, max: 100000})}`;
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `yara.auto.tester+${randomInt}@gmail.com`;
      const password = 'Test123!@#';
      const role = 'Farmer';
      const stateFilePath = `./stateFiles/e2e${randomInt}.json`;
      // Create the account.
      const context = await browser.newContext();
      const page = await context.newPage();
      await performSignup(page, firstName, lastName, role, email, password);
      await page.waitForTimeout(2000);
      await page.context().storageState({path: stateFilePath});
      await page.close();
      // Use the account value.
      await use({firstName, lastName, email, role, password, randomInt, stateFilePath});
    },
    {scope: 'worker'},
  ],
  authenticatedPage: async ({page, account}, use) => {
    const {firstName, lastName, email, role, password, randomInt, stateFilePath} = account;
    const storageState = JSON.parse((await fs.readFile(stateFilePath)).toString());
    /** @type {PomManager} */
    const pom = new PomManager(page);
    try {
      await pom.page.goto('/');
      // Check for cookies data
      if (!storageState.cookies || storageState.cookies.length === 0) {
        console.log('No cookies found in the storage state');
        throw new Error('No cookies found in the storage state');
      }
      // Set the cookies
      await pom.page.context().addCookies(storageState.cookies);
      // Check for local storage data
      if (
        !storageState.origins ||
        storageState.origins.length === 0 ||
        !storageState.origins[0].localStorage ||
        storageState.origins[0].localStorage.length === 0
      ) {
        console.log('No local storage items found in the storage state');
        throw new Error('No local storage items found in the storage state');
      }
      // Set the local storage items
      await pom.page.evaluate((items) => {
        for (const item of items) {
          localStorage.setItem(item.name, item.value);
        }
      }, storageState.origins[0].localStorage);
      await pom.page.goto('/farms');
      await pom.page.waitForURL('**/farms', {timeout: 1000});
      if (pom.page.url() === '**/login?redirect=%2F/farms') {
        throw new Error('Error setting the storage state');
      }
    } catch (error) {
      console.error('Error setting the storage state: ', error);

      await pom.page.goto('/');
      await pom.loginPage.acceptAllCookies();
      await pom.loginPage.loginUser(email, password);
    }
    await pom.farmsPage.waitUntilPageIsLoaded();
    await Utils.setProcessEnvironmentVariables(stateFilePath);
    // Use signed-in page in the test.
    await use(page);
  },
});

/**
 * Performs the signup process and verifies the user is signed in.
 *
 * @param {import('playwright').Page} page - The Playwright page object.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {string} role - The role of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
async function performSignup(page, firstName, lastName, role, email, password) {
  const pom = new (page);
  await pom.page.goto('/');
  await pom.loginPage.open();
  await pom.loginPage.acceptAllCookies();
  await pom.loginPage.linkToSignup.click();
  await pom.signupPage.waitUntilPageIsLoaded();
  await pom.signupPage.signupUser(firstName, lastName, role, email, password);
  await pom.homePage.waitUntilPageIsLoaded();
  await base.expect(pom.homePage.welcomeText).toHaveText(`Thanks for joining Atfarm, ${firstName}`);
}

exports.expect = base.expect;
