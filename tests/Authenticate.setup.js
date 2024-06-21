/**
 * @fileoverview This file contains setup functions for authenticating farmer users and advisors in different countries.
 * It also includes helper functions for performing authentication and checking session expiration.
 * @module authenticate.setup
 */
import {PomManager} from '../page-objects/PomManager';
import {test as setup} from '@playwright/test';
const {Utils} = require('../helpers/Utils');

/**
 * User data for the current environment.
 * @type {Object}
 */
const userDataForEnv = Utils.getEnvironment().userData;

/**
 * Setup function for authenticating farmer user in Germany.
 * @param {Object} page - The Playwright test page.
 */
setup('authenticate farmer user in Germany', async ({page}) => {
  const stateFilePath = './stateFiles/DEfarmer.json';
  const expired = await isSessionExpired(stateFilePath);
  if (expired) {
    console.log('Performing re-authentication.');
    await performAuth(page, userDataForEnv.deFarmerUser.email, userDataForEnv.deFarmerUser.password, stateFilePath);
  } else {
    console.log('Using existing state');
  }
});

/**
 * Performs authentication for a user and stores session state to a file.
 * @param {Object} page - The Playwright page object.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} stateFilePath - The file path to store the session state.
 */
async function performAuth(page, email, password, stateFilePath) {
  await page.goto('/');
  const pom = new PomManager(page);
  await pom.loginPage.acceptAllCookies();
  await pom.loginPage.loginUser(email, password);
  const userWithCleanData = await pom.homePage.isFarmsCountZero();
  if (!userWithCleanData) {
    await pom.farmsPage.waitUntilPageIsLoaded();
  }

  await pom.page.context().storageState({path: stateFilePath});
  if (!(await Utils.waitForFileToBeAccessibleAndReadable(stateFilePath))) {
    console.log('State file WAS NOT created in 2s');
  } else {
    console.log('STATE FILE CREATED SUCCESSFULLY');
  }
  await pom.page.close();
}

/**
 * Checks if the session has expired.
 * @param {string} stateFilePath - The file path to the session state file.
 * @returns {boolean} Returns true if the session has expired, false otherwise, continuing with authenticating the user.
 */
async function isSessionExpired(stateFilePath) {
  try {
    if (!(await Utils.waitForFileToBeAccessibleAndReadable(stateFilePath))) {
      console.log('State file not present');
      return true;
    } else {
      console.log('STATE FILE IS PRESENT');
    }
    const searchedData = await Utils.extractValueFromJson(stateFilePath, 'apc_session');
    const searchedDataValueJson = JSON.parse(searchedData.value);

    console.log(`APC session ID: ${searchedDataValueJson.id}`);
    console.log(`APC session user ID: ${searchedDataValueJson.userId}`);

    if (!searchedDataValueJson) {
      console.log('Session data is missing');
      return true;
    }

    const {timestamp, duration} = searchedDataValueJson;
    const expirationTime = timestamp + duration;
    const currentTimestamp = Date.now();

    console.log(`proceeding with current session check: ${currentTimestamp} > ${expirationTime}`);
    return currentTimestamp > expirationTime;
  } catch (error) {
    console.error('Error during session check:', error);
    return true;
  }
}
