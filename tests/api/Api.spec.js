import {PomManager} from '../../page-objects/PomManager';
import {ApiClient} from '../../helpers/ApiClient';
const {test, expect} = require('@playwright/test');
const {Utils} = require('../../helpers/Utils');
const {coordinates} = require('../../data/coordinates');
import {faker} from '@faker-js/faker';

test.skip('getCropTypes', async ({page, request}) => {
  const apiClient = new ApiClient(request);
  const pom = new PomManager(page);
  const stateFilePath = './state.json';
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `yara.auto.tester+${faker.number.int(1000)}@gmail.com`;
  const country = 'UK';
  const password = 'Test123!@#';
  const role = 'Farmer';

  await pom.loginPage.open();
  await pom.loginPage.acceptAllCookies();
  await pom.loginPage.linkToSignup.click();
  await pom.signupPage.waitUntilPageIsLoaded();
  await pom.signupPage.signupUserNew(firstName, lastName, country, role, email, password);
  await pom.homePage.waitUntilPageIsLoaded();
  await expect(pom.homePage.welcomeText).toHaveText(`Thanks for joining Atfarm, ${firstName}`);
  await pom.page.context().storageState({path: stateFilePath});

  await Utils.setProcessEnvironmentVariables(stateFilePath);

  const responseForDetectRegions = await apiClient.detectRegions(coordinates.usa1);
  const detectRegionsBody = await responseForDetectRegions.json();
  const regionId = await detectRegionsBody.data.detectRegions[0].region.id;

  const responseFroGetCropTypes = await apiClient.getCropTypes(regionId);
  const cropTypesBody = await responseFroGetCropTypes.json();
  const cropValuesJson = Utils.extractCropValuesFromJson(cropTypesBody);
  const randomCrop = Utils.getRandomCrop(cropValuesJson);
});

test.skip('create and delete farm and field', async ({page, request}) => {
  const apiClient = new ApiClient(request);
  const pom = new PomManager(page);
  let farmId;
  let fieldId;
  await Utils.setProcessEnvironmentVariables('./DEfarmerState.json');
  const farmName = `Farm ${new Date().getTime()}`;
  //getting a crop that has VRA capability
  const crop = await Utils.extractCropValuesBasedOnCapabilities(availableCrops.germany, ['VRA NSensor']);
  const fieldName = `Field ${crop.cropDescription.cropSubClass.name}`;

  //login with proper user and save session
  ({farmId, fieldId} = await apiClient.createFarmFieldAndFreeSubscription(farmName, fieldName, crop, coordinates.germany1, 'DE'));

  console.log('Farm  IDs:', farmId, fieldId);
  console.log(`User ID: ${process.env.USER_ID}`);
  // console.log(`Token: Bearer ${process.env.API_TOKEN}`);
  const response = await apiClient.deleteFarmAndField(farmId, fieldId);
});
