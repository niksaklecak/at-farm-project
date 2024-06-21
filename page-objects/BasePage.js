/**
 * Represents a base page object that provides common functionality and properties for all page objects.
 */
export class BasePage {
  /**
   * Creates a new instance of the BasePage class.
   * @param {Page} page - The page object representing the browser page.
   */
  constructor(page) {
    this.page = page;
    //side menu
    this.currentFarmMenuLink = page.locator('#tracking-navigation-collapse-icon');
    this.currentFarmSwitcher = page.getByTestId('current-farm-popover-switch');
    this.notificationsMenuLink = page.locator('div.sc-fzqyOu.fwuRSH').filter({hasText: 'Notifications'});
    this.upgradeMenuLink = page.getByTestId('upgrade-link');
    this.accountMenuLink = page.locator('#tracking-navigation-menu-footer-account');
    this.fieldsMenuLink = page.getByTestId('fieldsMenuLink');
    this.soilAnalysisMenuLink = page.getByTestId('soilAnalysisMenuLink');
    this.statusMessage = page.getByRole('status');
  }

  /**
   * Waits until the page url and a specific request provided requestName variable is loaded.
   * @param {string} [pageUrl=this.pageUrl] - The URL of the page to wait for.
   * @param {string} [requestName=this.requestName] - The name of the request to wait for.
   */
  async waitUntilPageIsLoaded(pageUrl = this.pageUrl, requestName = this.requestName) {
    // Wait for URL or URL pattern to load
    if (pageUrl) {
      const urlPattern = new RegExp(pageUrl);
      await console.log(`Waiting for page url ${pageUrl} to load...`);
      await this.page.waitForURL((url) => urlPattern.test(url));
      await console.log(`Page url ${pageUrl} is loaded`);
    }
    await this.page.waitForLoadState('load');

    // Wait for request to load
    if (requestName) {
      const startTime = new Date();
      try {
        await this.page.waitForResponse(
          (response) => {
            const postData = response.request().postData();
            if (postData && postData.includes(requestName)) {
              return true;
            }
            return false;
          },
          {timeout: 50000},
        );
      } catch (error) {
        if (error.name === 'TimeoutError') {
          console.log(`Timeout expired for ${requestName}`);
          return; // Skip the rest of the code in this block
        }
        throw error; // If it's not a timeout error, re-throw it
      }
      const endTime = new Date();
      const loadTime = endTime - startTime;
      console.log(`Time taken for ${requestName}: ${loadTime} ms`);
    }
  }

  /**
   * Opens the specified page URL.
   * @param {string} [pageUrl=this.pageUrl] - The URL of the page to open.
   */
  async open(pageUrl = this.pageUrl) {
    let pageUrl_l;
    if (pageUrl.startsWith('.*\\/')) {
      pageUrl_l = pageUrl.replace('.*\\/', '/').replace('\\/', '/');
    } else {
      pageUrl_l = pageUrl;
    }
    await console.log(`Opening page ${pageUrl_l}...`);

    await this.page.goto(pageUrl_l);
    await this.waitUntilPageIsLoaded();
  }

  /**
   * Performs a browser-specific action.
   * @param {string} browserName - The name of the browser.
   * @param {string} action - The action to perform.
   */
  async performBrowserSpecificAction(browserName, action) {
    switch (browserName) {
      case 'chrome':
        // Override this method in your POM class for Chrome-specific action
        await this.performChromeAction(action);
        break;
      case 'chromium':
        // Override this method in your POM class for Chromium-specific action
        await this.performChromiumAction(action);
        break;
      case 'edge':
        // Override this method in your POM class for Edge-specific action
        await this.performEdgeAction(action);
        break;
      case 'firefox':
        // Override this method in your POM class for Firefox-specific action
        await this.performFirefoxAction(action);
        break;
      case 'webkit':
        // Override this method in your POM class for Webkit-specific action
        await this.performWebkitAction(action);
        break;
      default:
      // Handle other browsers or no action needed
    }
  }

  /**
   * Override method for performing Chrome-specific action.
   * @param {string} action - The action to perform.
   */
  async performChromeAction(action) {
    // Implement Chrome-specific action
  }

  /**
   * Override method for performing Chromium-specific action.
   * @param {string} action - The action to perform.
   */
  async performChromiumAction(action) {
    // Implement Chromium-specific action
  }

  /**
   * Override method for performing Edge-specific action.
   * @param {string} action - The action to perform.
   */
  async performEdgeAction(action) {
    // Implement Edge-specific action
  }

  /**
   * Override method for performing Firefox-specific action.
   * @param {string} action - The action to perform.
   */
  async performFirefoxAction(action) {
    // Implement Firefox-specific action
  }

  /**
   * Override method for performing Webkit-specific action.
   * @param {string} action - The action to perform.
   */
  async performWebkitAction(action) {
    // Implement Webkit-specific action
  }
}
