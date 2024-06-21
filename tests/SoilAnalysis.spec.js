import {PomManager} from '../../page-objects/PomManager';
import {ApiClient} from '../../helpers/ApiClient';
const {test, expect} = require('@playwright/test');
import {Utils} from '../../helpers/Utils';
const {coordinates} = require('../../data/coordinates');

test.describe('Test VRA s using default strategy ', () => {
  test.use({storageState: './stateFiles/DEfarmer.json'});

  test.beforeEach(async () => {
    await Utils.setProcessEnvironmentVariables('./stateFiles/DEfarmer.json');
  });

  test('Checking if Soil Analysis is ', async ({page, request}) => {
    const apiClient = new ApiClient(request);
    const pom = new PomManager(page);
    const cropFarmFieldData = {
      countryCode: 'DE',
      currency: 'EUR',
      coordinates: coordinates.germany2,
      capabilitiesList: ['PA'],
    };
    const {farmName, fieldName, farmId, fieldId, crop} = await apiClient.createCropFarmFieldAndFreeSubscription(cropFarmFieldData);
    await pom.farmsPage.open();
    await expect(await pom.farmsPage.addMoreFarmsButton).toBeVisible();
    await pom.farmsPage.openFarm(farmName);
    await pom.farmsPage.soilAnalysisMenuLink.click();
    await pom.soilAnalysisPage.waitUntilPageIsLoaded();
    await pom.soilAnalysisPage.addSoilAnalysisButton.click();
    await pom.soilAnalysisPage.modalManuallyEnterSoilAnalysisDataButton.click();
    await pom.standardAnalysisPage.waitUntilPageIsLoaded();
    await pom.standardAnalysisPage.setDate();
    await pom.standardAnalysisPage.totalPValue.fill('100');
    await pom.standardAnalysisPage.totalKValue.fill('100');
    await pom.standardAnalysisPage.totalCaValue.fill('100');
    await pom.standardAnalysisPage.totalMgValue.fill('100');
    await pom.standardAnalysisPage.totalSValue.fill('100');
    await pom.standardAnalysisPage.saveSoilAnalysisButton.click();
    await pom.soilAnalysisPage.waitUntilPageIsLoaded();
    await expect(await pom.soilAnalysisPage.soilAnalysisTable).toBeVisible();
    await expect(await pom.soilAnalysisPage.notAssignedToAFiledNotification).toBeVisible();
    await pom.soilAnalysisPage.assignFieldToSoilAnalysis(fieldName);
  });
  test.afterEach(async ({page}) => {
    const apiClient = new ApiClient(page);
    await apiClient.cleanUserData();
    const pom = new PomManager(page);
    await pom.page.close();
  });
});
