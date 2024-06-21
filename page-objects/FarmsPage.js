const {BasePage} = require('./base.page');

//Page with field details after creating the field
exports.FarmsPage = class FarmsPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);
    this.page = page;
    this.pageUrl = '.*\\/farms';
    this.requestName = 'query Farms';
    this.addMoreFarmsButton = page.getByText('Add more farms');
    this.farmName = page.getByTestId('farms-list-with-fields');
    this.searchFarmInput = page.locator('#tracking-farm-list-screen-farm-list-view-search-farms');
    this.farmJDOCLabel = page.locator('div.sc-qYiqT.sc-pktCe.sc-pspzH.kXsonA');
    this.johnDeereButton = page.getByRole('button', {name: 'John Deere'});
  }

  async openFarm(farmName) {
    await this.page.getByTestId('farms-list-with-fields').getByText(farmName).click();
  }
  //sc-pAZqv hddigY
  async waitUntilSpinnerIsGone() {
    await this.page.waitForSelector('.sc-pAZqv hddigY', {state: 'detached'}, {timeout: 30000});
  }
};
