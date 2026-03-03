// Page object for the application's home/search page
// based on the HTML snippet provided.

class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // locators derived from the form markup
    this.searchInput = page.locator('input.search-keyword');
    this.searchButton = page.locator('button.search-button');
    this.backButton = page.locator('a.back-button');
  }

  /**
   * Perform a product search using the keyword input.
   * @param {string} productName
   */
  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    // optionally wait for results to appear, depending on app behaviour
    }

  /**
   * Check whether a searched product is displayed on the page.
   * Returns true if found and visible, false otherwise.
   * @param {string} productName
   * @returns {Promise<boolean>}
   */
  async isProductDisplayed(productName) {
    const productLocator = this.getProductLocator(productName);
    try {
      await productLocator.first().waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Return a locator scoped to a product card matching the visible product name.
   * @param {string} productName
   */
  getProductLocator(productName) {
    // Match the product card that contains the product name text
    return this.page.locator(`.product:has-text("${productName}")`);
  }

  /**
   * Read the product price text for a given product.
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getProductPrice(productName) {
    const product = this.getProductLocator(productName);
    return (await product.locator('.product-price').innerText()).trim();
  }

  /**
   * Add a product to cart by name. Optionally set quantity.
   * @param {string} productName
   * @param {number} quantity
   */
  async addProductToCart(productName, quantity = 1) {
    const product = this.getProductLocator(productName);
    const qtyInput = product.locator('input.quantity');
    const addButton = product.locator('button');
    // set quantity if necessary
    if (quantity && quantity > 1) {
      await qtyInput.fill(String(quantity));
    }
    await addButton.click();
  }

  
}

module.exports = { HomePage };
