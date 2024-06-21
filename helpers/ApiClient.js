import {graphqlQuery} from '../data/graphqlQueries';
import {Utils} from './Utils';

/**
 * Represents the environment data.
 * @type {Object}
 */
const envData = Utils.getEnvironment();
/**
 * The API endpoint URL.
 * @type {string}
 */
const apiEndpoint = process.env.GRAPHQL_API_URL || envData.envApiBaseUrl;

// Access user data
const userDataForEnv = envData.userData;
/**
 * Represents an API client for interacting with the server.
 */
export class ApiClient {
  /**
   * Creates a new instance of the ApiClient class.
   * @param {Object} request The request object used for making HTTP requests.
   */
  constructor(request) {
    this.request = request;
  }

  /**
   * Retrieves farms using a GraphQL query.
   * @returns {Promise<Object>} The response object containing the farms data.
   * @throws {Error} If the API call fails.
   */
  async getFarms() {
    const getFarmsQuery = graphqlQuery.getFarms;
    const response = await this.request.post(apiEndpoint, {
      data: {
        query: getFarmsQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`getFarms API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Creates a new farm.
   *
   * @param {string} farmName - The name of the farm.
   * @param {string} notes - Additional notes for the farm.
   * @returns {Promise<Object>} - The response object from the API call.
   * @throws {Error} - If the API call fails.
   */
  async createFarm(farmName, notes) {
    const createFarmQuery = graphqlQuery.createFarm(farmName, notes);

    console.log(createFarmQuery);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: createFarmQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`createFarm API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Creates a field.
   * @param {string} cropType The name of the farm.
   * @param {coordinates} coordinates The location of the field.
   * @param {string} name The name of the field.
   * @param {string} farmId The ID of the farm.
   * @returns {Promise<any>} A promise that resolves to the response from the server.
   * @throws {Error} - If the API call fails.
   */
  async createField(cropType, coordinates, name, farmId, regionId) {
    const createFieldQuery = graphqlQuery.createField(cropType, coordinates, name, farmId, regionId);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: createFieldQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`createField API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Deletes a field.
   * @param {string} fieldId The ID of the field.
   * @returns {Promise<any>} A promise that resolves to the response from the server.
   * @throws {Error} - If the API call fails.
   */
  async deleteField(fieldId) {
    const deleteFieldQuery = graphqlQuery.deleteField(fieldId);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: deleteFieldQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`deleteField API call failed: ${response.json()}`);
    }
    return response;
  }
  /**
   * Deletes a Farm.
   * @param {string} farmId The name of the farm.
   * @param {string} userId The name of the farm.
   * @returns {Promise<any>} A promise that resolves to the response from the server.
   * @throws {Error} - If the API call fails.
   */
  async deleteFarm(farmId, userId) {
    const deleteFarmIdQuery = graphqlQuery.deleteFarm(farmId, userId);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: deleteFarmIdQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`deleteFarm API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Retrieves the user subscriptions from the API.
   * @returns {Promise<Object>} The response object containing the user subscriptions.
   * @throws {Error} If the API call fails.
   */
  async getUserSubscriptions() {
    const getUserSubscriptionsQuery = graphqlQuery.getUserSubscriptions;

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: getUserSubscriptionsQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`getUserSubscriptions API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Updates a user with the provided information.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {string} firstName - The updated first name of the user.
   * @param {string} lastName - The updated last name of the user.
   * @param {string} email - The updated email of the user.
   * @param {string} countryCode - The updated country code of the user.
   * @param {string} locale - The updated locale of the user.
   * @param {string} role - The updated role of the user.
   * @returns {Promise<Object>} - The response object from the API call.
   * @throws {Error} - If the updateUser API call fails.
   */
  async updateUser(userId, firstName, lastName, email, countryCode, locale, role) {
    const updateUserQuery = graphqlQuery.updateUser(userId, firstName, lastName, email, countryCode, locale, role);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: updateUserQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`updateUser API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Cancels a subscription.
   *
   * @param {string} subscriptionId - The ID of the subscription to cancel.
   * @param {string} userId - The ID of the user associated with the subscription.
   * @returns {Promise<Object>} - A promise that resolves to the response object.
   * @throws {Error} - If the cancelSubscription API call fails.
   */
  async cancelSubscription(subscriptionId, userId) {
    const cancelSubscriptionQuery = graphqlQuery.cancelSubscription(subscriptionId, userId);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: cancelSubscriptionQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`cancelSubscription API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Adds a free subscription for a farm and field.
   *
   * @param {string} farmId - The ID of the farm.
   * @param {string} fieldId - The ID of the field.
   * @param {string} currency - The currency for the subscription.
   * @param {string} countryCode - The country code for the subscription.
   * @returns {Promise<Object>} - The response object from the API call.
   * @throws {Error} - If the API call fails.
   */
  async addFreeSubscription(farmId, fieldId, currency, countryCode) {
    const addFreeSubscriptionQuery = graphqlQuery.addFreeSubscription(farmId, fieldId, currency, countryCode);

    await console.log(addFreeSubscriptionQuery);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: addFreeSubscriptionQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`addFreeSubscription API call failed: ${await response.json()}`);
    }
    return response;
  }

  /**
   * Detects regions based on the given coordinates.
   *
   * @param {Array} coordinates - The coordinates to detect regions for.
   * @returns {Promise} - A promise that resolves with the response from the API.
   * @throws {Error} - If the detectRegions API call fails.
   */
  async detectRegions(coordinates) {
    const detectRegionsQuery = graphqlQuery.detectRegions(coordinates);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: detectRegionsQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`detectRegions API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Retrieves the crop types for a given region.
   *
   * @param {string} regionId - The ID of the region.
   * @returns {Promise<Object>} - A promise that resolves to the response object containing the crop types.
   * @throws {Error} - If the getCropTypes API call fails.
   */
  async getCropTypes(regionId) {
    const getCropTypesQuery = graphqlQuery.getCropTypes(regionId);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: getCropTypesQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`getCropTypes API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Retrieves farm details by ID.
   *
   * @param {string} farmId - The ID of the farm.
   * @returns {Promise<Object>} - The response object containing the farm details.
   * @throws {Error} - If the API call fails.
   */
  async getFarmDetailsById(farmId) {
    const getFarmDetailsByIdQuery = graphqlQuery.getFarmDetailsById(farmId);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: getFarmDetailsByIdQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`getFarmDetailsById API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Retrieves fields for a given farm ID.
   *
   * @param {string} farmId - The ID of the farm.
   * @returns {Promise<Object>} - The response object containing the fields.
   * @throws {Error} - If the API call fails.
   */
  async getFields(farmId) {
    const getFieldsQuery = graphqlQuery.getFields(farmId);

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: getFieldsQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`getFields API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Retrieves user data from the API.
   * @returns {Promise<Object>} The response object containing the user data.
   * @throws {Error} If the API call fails.
   */
  async getUser() {
    const getCropTypesQuery = graphqlQuery.getUser();

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: getCropTypesQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`getCropTypes API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Retrieves user information.
   * @returns {Object} The user information.
   * @throws {Error} If the API call fails.
   */
  async me() {
    const meQuery = graphqlQuery.me;

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: meQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`me API call failed: ${response.json()}`);
    }

    const responseBody = await response.json();
    const countryCode = responseBody.data.me.countryCode;
    const email = responseBody.data.me.email;
    const firstName = responseBody.data.me.firstName;
    const id = responseBody.data.me.id;
    const lastName = responseBody.data.me.lastName;
    const locale = responseBody.data.me.locale;
    const role = responseBody.data.me.role;
    const jdoc = responseBody.data.me.jdocUserSettings;
    const farms = responseBody.data.me.farms;

    return {id, firstName, lastName, email, locale, role, countryCode, jdoc, farms};
  }

  async deleteJdocUserToken() {
    const deleteJdocUserTokenQuery = graphqlQuery.deleteJdocUserToken;

    const response = await this.request.post(apiEndpoint, {
      data: {
        query: deleteJdocUserTokenQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });
    if (response.status === 400) {
      throw new Error(`deleteJdocUserTokenQuery API call failed: ${response.json()}`);
    }
    return response;
  }

  /**
   * Creates a farm field and a free subscription.
   *
   * @param {string} farmName - The name of the farm.
   * @param {string} fieldName - The name of the field.
   * @param {string} crop - The crop associated with the field.
   * @param {string} coordinates - The coordinates of the field.
   * @param {string} countryCode - The country code associated with the field.
   * @param {string} currency - The currency associated with the field.
   * @returns {Promise<{farmId: string, fieldId: string}>} - The farm ID and field ID of the created farm field.
   */
  async createFarmFieldAndFreeSubscription(farmName, fieldName, crop, coordinates, countryCode, currency) {
    const responseForCreateAFarm = await this.createFarm(farmName, 'Test farm');
    const farmBody = await responseForCreateAFarm.json();
    const farmId = await farmBody.data.createFarm.id;

    const fieldId = await this.createFieldAndFreeSubscription(farmId, fieldName, crop, coordinates, countryCode, currency);
    return {farmId, fieldId};
  }

  /**
   * Creates a field and adds a free subscription for the specified farm.
   *
   * @param {string} farmId - The ID of the farm.
   * @param {string} fieldName - The name of the field.
   * @param {object} crop - The crop object.
   * @param {object} coordinates - The coordinates of the field.
   * @param {string} countryCode - The country code.
   * @param {string} currency - The currency.
   * @returns {string} - The ID of the created field.
   */
  async createFieldAndFreeSubscription(farmId, fieldName, crop, coordinates, countryCode, currency) {
    const responseForCreateAField = await this.createField(crop.cropDescription.atFarmCropType, coordinates, fieldName, farmId, crop.id);
    const fieldBody = await responseForCreateAField.json();
    const fieldId = await fieldBody.data.createField.id;

    const sub = await this.addFreeSubscription(farmId, fieldId, currency, countryCode);
    return fieldId;
  }

  /**
   * Deletes a farm and a field.
   *
   * @param {string} farmId - The ID of the farm to delete.
   * @param {string} fieldId - The ID of the field to delete.
   * @returns {Promise<{responseFieldDeleted: any, responseFarmDeleted: any}>} - A promise that resolves to an object containing the response for the deleted field and the response for the deleted farm.
   */
  async deleteFarmAndField(farmId, fieldId) {
    const {responsesFieldDeleted, responseFarmDeleted} = await this.deleteFarmAndFields(farmId, [fieldId]);
    return {responseFieldDeleted: responsesFieldDeleted[0], responseFarmDeleted};
  }

  /**
   * Deletes a farm and its associated fields.
   * @param {string} farmId - The ID of the farm to delete.
   * @param {string[]} fieldIds - An array of field IDs associated with the farm.
   * @returns {Promise<{responsesFieldDeleted: Response[], responseFarmDeleted: Response}>} - A promise that resolves to an object containing the responses for field deletions and farm deletion.
   */
  async deleteFarmAndFields(farmId, fieldIds) {
    console.log(`deleting farmId: ${farmId}`);

    const responsesFieldDeleted = [];
    for (const fieldId of fieldIds) {
      console.log(`deleting fieldId: ${fieldId}`);
      const responseFieldDeleted = await this.deleteField(fieldId);
      const fieldDeletedBody = await responseFieldDeleted.json();
      console.log(`fieldDeletedBody: ${JSON.stringify(fieldDeletedBody)}`);
      responsesFieldDeleted.push(responseFieldDeleted);
    }

    const responseFarmDeleted = await this.deleteFarm(farmId, process.env.USER_ID);
    const farmDeletedBody = await responseFarmDeleted.json();
    console.log(`farmDeletedBody: ${JSON.stringify(farmDeletedBody)}`);

    return {responsesFieldDeleted, responseFarmDeleted};
  }

  /**
   * Sets a random crop based on the provided coordinates, capabilities map, and other optional parameters.
   *
   * @param {Array} coordinates - The coordinates for detecting regions.
   * @param {Object} capabilitiesMap - The map of capabilities.
   * @param {Array} [unwantedCapabilitiesMap=[]] - The map of unwanted capabilities (optional, default is an empty array).
   * @param {boolean} [includePlanValidation=false] - Whether to include plan validation (optional, default is false).
   * @returns {Array} - The extracted crop values based on the capabilities.
   */
  async setRandomCrop(coordinates, capabilitiesMap, unwantedCapabilitiesMap = [], includePlanValidation) {
    const responseForDetectRegions = await this.detectRegions(coordinates);
    const detectRegionsBody = await responseForDetectRegions.json();
    const regionId = await detectRegionsBody.data.detectRegions[0].region.id;
    const responseFroGetCropTypes = await this.getCropTypes(regionId);
    const cropTypesBody = await responseFroGetCropTypes.json();
    return Utils.extractCropValuesBasedOnCapabilities(
      cropTypesBody.data.cropRegions.entities,
      capabilitiesMap,
      unwantedCapabilitiesMap,
      includePlanValidation,
    );
  }

  /**
   * Sets a random crop based on the provided country code, capabilities map, and other optional parameters.
   *
   * @param {string} countryCode - The country code.
   * @param {object} capabilitiesMap - The capabilities map.
   * @param {object[]} [unwantedCapabilitiesMap=[]] - The unwanted capabilities map (optional, default is an empty array).
   * @param {boolean} [includePlanValidation] - Whether to include plan validation (optional).
   * @returns {Promise<object[]>} - A promise that resolves to an array of crop values based on the provided parameters.
   */
  async setRandomCrop(countryCode, capabilitiesMap, unwantedCapabilitiesMap = [], includePlanValidation) {
    const responseForDetectRegions = await this.detectRegions(coordinates);
    const detectRegionsBody = await responseForDetectRegions.json();
    let regionId;
    s;
    if (detectRegionsBody.data === null) {
      const regions = await this.getRegions(countryCode);
      regionId = Utils.getRandomValueFromList(regions);
    }

    const responseFroGetCropTypes = await this.getCropTypes(regionId);
    const cropTypesBody = await responseFroGetCropTypes.json();
    return Utils.extractCropValuesBasedOnCapabilities(
      cropTypesBody.data.cropRegions.entities,
      capabilitiesMap,
      unwantedCapabilitiesMap,
      includePlanValidation,
    );
  }

  /**
   * Creates a random crop farm field and free subscription.
   *
   * @param {string} countryCode - The country code.
   * @param {string} [currency='EUR'] - The currency.
   * @param {Array<number>} coordinates - The coordinates.
   * @param {Object} capabilitiesMap - The capabilities map.
   * @param {Array<Object>} [unwantedCapabilitiesMap=[]] - The unwanted capabilities map.
   * @param {boolean} [includePlanValidation=true] - Whether to include plan validation.
   * @returns {Object} - An object containing the farm name, field name, farm ID, and field ID.
   */
  async createRandomCropFarmFieldAndFreeSubscription(
    countryCode,
    currency = 'EUR',
    coordinates,
    capabilitiesMap,
    unwantedCapabilitiesMap = [],
    includePlanValidation = true,
  ) {
    const farmName = `Farm ${new Date().getTime()}`;
    const crop = await this.setRandomCrop(coordinates, capabilitiesMap, unwantedCapabilitiesMap, includePlanValidation);
    const fieldName = `Field ${crop.cropDescription.cropSubClass.name}`;
    const {farmId, fieldId} = await this.createFarmFieldAndFreeSubscription(farmName, fieldName, crop, coordinates, countryCode, currency);
    return {farmName, fieldName, farmId, fieldId};
  }

  /**
   * Creates a crop farm field and a free subscription.
   *
   * @param {Object} params - The parameters for creating the crop farm field and free subscription.
   * @param {string} [params.farmName] - The name of the farm. If not provided, a default name will be generated.
   * @param {string} [params.farmId] - The ID of the farm. If not provided, a new farm will be created.
   * @param {Object} [params.crop] - The crop object. If not provided, a random crop will be selected.
   * @param {Object} [params.coordinates] - The coordinates of the field.
   * @param {string} [params.countryCode='DE'] - The country code.
   * @param {string} [params.currency='EUR'] - The currency.
   * @param {Array} [params.capabilitiesList=[]] - The list of capabilities.
   * @param {Array} [params.unwantedCapabilitiesList=[]] - The list of unwanted capabilities.
   * @param {boolean} [params.includePlanValidation=true] - Whether to include plan validation.
   * @returns {Object} - An object containing the farm name, field name, farm ID, field ID, and crop.
   */
  async createCropFarmFieldAndFreeSubscription(params) {
    let {
      farmName = `Farm ${new Date().getTime()}`,
      farmId,
      crop,
      coordinates,
      countryCode = 'DE',
      currency = 'EUR',
      capabilitiesList = [],
      unwantedCapabilitiesList = [],
      includePlanValidation = true,
    } = params;

    // If farmId is not provided, create a new farm
    if (!farmId) {
      const responseForCreateAFarm = await this.createFarm(farmName, 'Test farm');
      const farmBody = await responseForCreateAFarm.json();
      farmId = await farmBody.data.createFarm.id;
    }

    // If crop is not provided, get a random crop
    if (!crop) {
      crop = await this.setRandomCrop(coordinates, capabilitiesList, unwantedCapabilitiesList, includePlanValidation);
    }

    // Create a new field and free subscription
    const fieldName = `Field ${crop.cropDescription.cropSubClass.name}`;
    const fieldId = await this.createFieldAndFreeSubscription(farmId, fieldName, crop, coordinates, countryCode, currency);

    return {farmName, fieldName, farmId, fieldId, crop};
  }

  /**
   * Updates the user values.
   *
   * @param {object} user - The user object.
   * @param {object} values - The updated values for the user.
   * @param {string} values.firstName - The updated first name.
   * @param {string} values.lastName - The updated last name.
   * @param {string} values.email - The updated email.
   * @param {string} values.countryCode - The updated country code.
   * @param {string} values.locale - The updated locale.
   * @param {string} values.role - The updated role.
   * @returns {Promise<Response>} The response from the updateUser API call.
   */
  async updateUserValues(user, values) {
    const userId = process.env.USER_ID;

    let {
      firstName = user.firstName,
      lastName = user.lastName,
      email = user.email,
      countryCode = user.countryCode,
      locale = user.locale,
      role = user.role,
    } = values;

    const response = await this.updateUser(userId, firstName, lastName, email, countryCode, locale, role);
    const responseBody = await response.json();
    console.log(`responseBody: ${JSON.stringify(responseBody)}`);
    return response;
  }

  /**
   * Resets a user's information.
   *
   * @param {Object} user - The user object containing the user's information.
   * @param {string} user.firstName - The first name of the user.
   * @param {string} user.lastName - The last name of the user.
   * @param {string} user.email - The email address of the user.
   * @param {string} user.role - The role of the user.
   * @param {string} user.locale - The locale of the user.
   * @param {string} user.countryCode - The country code of the user.
   * @returns {Promise<void>} - A promise that resolves when the user's information is reset.
   */
  async resetUser(user) {
    const userId = process.env.USER_ID;

    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const role = user.role.toUpperCase();
    const locale = user.locale;
    const countryCode = user.countryCode;

    const response = await this.updateUser(userId, firstName, lastName, email, countryCode, locale, role);
    const responseBody = await response.json();
    console.log(`responseBody: ${JSON.stringify(responseBody)}`);
  }

  /**
   * Cleans the user data by deleting all fields and farms associated with the user.
   * If the user has a jdoc farm, it also deletes the jdoc user token.
   * @returns {Promise<void>} A promise that resolves when the user data is cleaned.
   */
  async cleanUserData() {
    const userMe = await this.me();
    const userId = userMe.id;
    const jdoc = userMe.jdoc === null ? false : true;

    const farms = await userMe.farms;

    for (const farm of farms) {
      for (const field of farm.fields) {
        await this.deleteField(field.id);
        console.log(`Field : ${field.name} with id ${field.id} from Farm : ${farm.name} deleted.`);
      }

      // Only delete the farm if it's not a jdoc farm
      if (farm.jdoc === null) {
        await this.deleteFarm(farm.id, userId);
        console.log(`Jdoc Farm : ${farm.name} with id ${farm.id} deleted.`);
      }
    }
    if (jdoc) {
      await this.deleteJdocUserToken();
    }
  }
}
