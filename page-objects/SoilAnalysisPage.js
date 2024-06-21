const {BasePage} = require('./BasePage');

exports.SoilAnalysisPage = class SoilAnalysisPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
    this.pageUrl = '.*\\/soil-analysis';
    this.pageUrlPattern = '.*\\/soil-analysis\\?soilAnalysisType=Standard';
    this.addSoilAnalysisButton = page.getByTestId('addSoilAnalysisBtn');
    this.modalManuallyEnterSoilAnalysisDataButton = page.getByTestId('soil-analysis-manual-new');
    this.soilAnalysisTable = page.getByTestId('soilAnalysisTable');
    this.notAssignedToAFiledNotification = page.locator('.sc-AxgMl.hTDgdc');
    this.assignToAFiledDropdownButton = page.getByTestId('soil-analysis-field-assign-to');
  }

  async assignFieldToSoilAnalysis(filedName) {
    await this.page.getByRole('button', {name: 'Assign to'}).first().click();
    await this.page.getByRole('option', {name: filedName}).click();
    // await this.page.getByRole('button', {name: 'Close'}).click();
  }
};
