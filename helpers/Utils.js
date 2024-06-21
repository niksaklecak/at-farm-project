const fs = require('fs').promises;
const fs1 = require('fs');
const {userData} = require('../data/users');
require('dotenv').config();

/**
 * Utility class containing various helper methods.
 */
exports.Utils = class Utils {
  constructor() {}

  /**
   * Extracts a value from a JSON file based on the provided search item.
   * @param {string} stateFilePath - The path to the JSON file.
   * @param {string} jsonSearchedItem - The item to search for in the JSON file.
   * @returns {Promise<any>} - A promise that resolves with the extracted value.
   */
  static async extractValueFromJson(stateFilePath, jsonSearchedItem) {
    const fileContent = await fs.readFile(stateFilePath, 'utf-8');
    const stateJson = await JSON.parse(fileContent);
    return await stateJson.origins[0].localStorage.find((item) => item.name === jsonSearchedItem || item.name.includes(jsonSearchedItem));
  }

  /**
   * Retrieves a random value from a given list.
   * @param {Array} list - The list of values.
   * @returns {Promise<any>} - A promise that resolves with a random value from the list.
   */
  static async getRandomValueFromList(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  /**
   * Retrieves a random value from a given list, excluding a specific value.
   * @param {Array} list - The list of values.
   * @param {any} exceptValue - The value to exclude from the random selection.
   * @returns {Promise<any>} - A promise that resolves with a random value from the list, excluding the specified value.
   */
  static async getRandomValueFromListExcept(list, exceptValue) {
    const availableValues = list.filter((value) => value !== exceptValue);
    return await this.getRandomValueFromList(availableValues);
  }

  /**
   * Retrieves a random available option from a given list of options.
   * @param {Array} options - The list of options.
   * @returns {Promise<any>} - A promise that resolves with a random available option from the list.
   */
  static async getRandomAvailableOption(options) {
    // Create an empty array to store the visible options.
    let visibleOptions = [];

    // Loop over the options array.
    for (let i = 0; i < options.length; i++) {
      // Wait for the current option to become visible.
      const isVisible = await this.waitForElementToBeVisible(options[i], 1000);

      // If the option is visible, add it to the visibleOptions array.
      if (isVisible) {
        visibleOptions.push(options[i]);

        // Return a random value from the list of visible options.
        return this.getRandomValueFromList(visibleOptions);
      }
    }

    // If no options are visible, return an empty list.
    return [];
  }

  /**
   * Waits for an element to become visible within a specified timeout.
   * @param {string} element - The element selector.
   * @param {number} myTimeout - The timeout value in milliseconds.
   * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the element became visible or not.
   */
  static async waitForElementToBeVisible(element, myTimeout) {
    // Wait for the element to become visible with a custom timeout.
    try {
      await this.page.waitForSelector(element, {state: 'attached', timeout: myTimeout});
      console.log('Element is visible within 1 second.');
      return true;
    } catch (error) {
      console.log('Element is not visible within 1 second.');
      return false;
    }
  }

  /**
   * Sets the process environment variables based on the values extracted from a JSON file.
   * @param {string} stateFilePath - The path to the JSON file.
   * @returns {Promise<void>} - A promise that resolves when the environment variables are set.
   */
  static async setProcessEnvironmentVariables(stateFilePath) {
    const searchedToken = await this.extractValueFromJson(stateFilePath, 'idToken');
    process.env.API_TOKEN = searchedToken.value;
    const searchedUserId = await this.extractValueFromJson(stateFilePath, 'ajs_user_id');
    process.env.USER_ID = searchedUserId.value.replace(/"/g, '');
  }

  /**
   * Extracts crop values from a JSON object.
   * @param {Object} jsonData - The JSON object containing crop data.
   * @returns {Promise<void>} - A promise that resolves when the crop values are extracted.
   */
  static async extractCropValuesFromJson(jsonData) {
    // Iterate over the entities and keep only the desired fields
    const crops = jsonData.data.cropRegions.entities.map((entity) => {
      return {
        id: entity.id,
        applicationTags: entity.applicationTags,
        cropDescription: entity.cropDescription,
      };
    });

    console.log('Entities have been modified.');
    console.log(crops);

    // Write the modified data back to the file
    fs1.writeFileSync('crops.json', JSON.stringify(crops, null, 2));

    console.log('File has been updated.');
  }

  /**
   * Extracts crop values based on capabilities.
   *
   * @param {Array} cropJsonArray - The array of crop JSON objects.
   * @param {Array} capabilitiesMap - The array of capabilities to include.
   * @param {Array} unwantedCapabilitiesMap - The array of capabilities to exclude (optional).
   * @param {boolean} includePlanValidation - Flag to include plan validation (optional).
   * @returns {Promise<Object>} - A promise that resolves to a random crop object.
   */
  static async extractCropValuesBasedOnCapabilities(cropJsonArray, capabilitiesMap, unwantedCapabilitiesMap = [], includePlanValidation) {
    const filteredCrops = cropJsonArray.filter((crop) => {
      return (
        (!includePlanValidation || (crop.planValidation && crop.planValidation.soilAnalysisStatus === 'VALIDATED')) &&
        capabilitiesMap.every((capability) => crop.applicationTags.includes(capability)) &&
        unwantedCapabilitiesMap.every((unwantedCapability) => !crop.applicationTags.includes(unwantedCapability))
      );
    });
    const randomCrop = await this.getRandomValueFromList(filteredCrops);
    console.log('Random crop:', randomCrop.cropDescription.cropSubClass.name);
    return randomCrop;
  }

  /**
   * Formats a date object into a specified format.
   * @param {Date} date - The date object to format.
   * @param {string} format - The desired date format ('ISO' or 'US').
   * @returns {string} - The formatted date string.
   * @throws {Error} - If the specified date format is unsupported.
   */
  static async formatDate(date, format = 'ISO') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let formattedDate;
    switch (format) {
      case 'ISO':
        formattedDate = `${year}-${month}-${day}`;
        break;
      case 'US':
        formattedDate = `${month}/${day}/${year}`;
        break;
      default:
        throw new Error(`Unsupported date format: ${format}`);
    }

    return formattedDate;
  }

  /**
   * Retrieves the environment configuration.
   * @returns {Object} The environment configuration object.
   */
  static getEnvironment() {
    const env = process.env || {};
    const environmentName = env.ENVIRONMENT_NAME || 'integration';

    if (!env.ENVIRONMENT_NAME || !env.BASE_URL || !env.GRAPHQL_API_URL) {
      console.log('One or more environment variables not set, defaulting to integration values');
    }

    // Construct the base URLs based on the environment name
    const envBaseUrl = env.BASE_URL || `https://app.${environmentName}.at.farm`;
    const envApiBaseUrl = env.GRAPHQL_API_URL || `https://one2021-${environmentName}.stage.emea.yaradigitallabs.io/graphql`;
    // we are handling this like this because VSC is not able to accept userData[environmentName]
    let userDataForEnv = userData.integration;
    if (environmentName === 'staging') {
      userDataForEnv = userData.staging;
    }
    if (environmentName === 'production') {
      userDataForEnv = userData.production;
    }

    console.log('Environment Name: ' + environmentName);
    console.log('Base URL: ' + envBaseUrl);
    console.log('API Base URL: ' + envApiBaseUrl);
    console.log('User Data: ' + userDataForEnv);

    return {
      envName: environmentName,
      envBaseUrl: envBaseUrl,
      envApiBaseUrl: envApiBaseUrl,
      userData: userDataForEnv, // Access user data for the current environment
    };
  }

  /**
   * Waits for a file to become accessible and readable within a specified number of iterations.
   * @param {string} filePath - The path to the file.
   * @param {number} iterations - The number of iterations to wait for the file.
   * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the file became readable and populated or not.
   */
  static async waitForFileToBeAccessibleAndReadable(filePath, iterations = 2) {
    const start = Date.now();

    for (let i = 0; i < iterations; i++) {
      const fileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);

      if (fileExists) {
        const fileContent = await fs.readFile(filePath, 'utf8');

        if (fileContent.length > 0) {
          const end = Date.now();
          const timeSpent = end - start;
          console.log(`File ${filePath} became readable and populated after ${timeSpent} ms`);
          return true;
        }
      }

      // Wait for 1 second before the next iteration
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // If the file does not exist or is empty after the specified number of iterations, return false
    console.log(`File ${filePath} did not become readable and populated within the specified time`);
    return false;
  }

  /**
   * Compares the demand and supply values.
   * For this method I created unit tests in the unit tests folder utils.test.js
   *
   * @param {string} demandText - The demand value as a string.
   * @param {string} supplyText - The supply value as a string.
   * @returns {boolean} Returns true if the supply is greater than or equal to the demand, otherwise false.
   */
  static async compareValues(demandText, supplyText) {
    const demand = demandText !== '-' ? parseFloat(demandText) : 0;
    const supply = supplyText !== '-' ? parseFloat(supplyText) : 0;

    console.log('Demand: ' + demand);
    console.log('Supply: ' + supply);

    return supply >= demand;
  }
};
