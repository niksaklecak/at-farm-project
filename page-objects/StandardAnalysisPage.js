const {BasePage} = require('./BasePage');
const {Utils} = require('../helpers/Utils');

exports.StandardAnalysisPage = class StandardAnalysisPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
    this.pageUrl = '.*\\/soil-analysis\\/new\\?manualSoilAnalysisType=manualSoilAnalysis';
    this.datePicker = page.getByPlaceholder('YYYY-MM-DD');
    this.extractionMethodDropdown = page.getByTestId('extraction-method-select');
    this.saveSoilAnalysisButton = page.locator('[data-test-id="cnr-soil-analysis-save"]');
    this.totalNValue = page.locator('[data-test-id="cnr-manual-soil-analysis-input-N"]');
    this.totalPValue = page.locator('[data-test-id="cnr-manual-soil-analysis-input-P"]');
    this.totalKValue = page.locator('[data-test-id="cnr-manual-soil-analysis-input-K"]');
    this.totalCaValue = page.locator('[data-test-id="cnr-manual-soil-analysis-input-Ca"]');
    this.totalMgValue = page.locator('[data-test-id="cnr-manual-soil-analysis-input-Mg"]');
    this.totalSValue = page.locator('[data-test-id="cnr-manual-soil-analysis-input-S"]');
    this.totalNaValue = page.locator('[data-test-id="cnr-manual-soil-analysis-input-Na"]');
  }

  async setDate() {
    const formattedDate = await Utils.formatDate(new Date());
    await this.datePicker.fill(formattedDate);
  }

  async setRandomExtractionMethod() {
    await this.extractionMethodDropdown.click();
    const extractionMethods = await this.page.$$('[role="option"]');
    if (extractionMethods.length > 0) {
      const extractionMethod = await Utils.getRandomValueFromList(extractionMethods);
      await extractionMethod.click();
    }
  }
};
