// Page object representing the shopping cart screen. Locators and helpers
// are based on typical cart-item markup; adjust selectors as needed to match
// your application's DOM.

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // root elements
    this.cartItems = page.locator('.cart-items .cart-item');
    this.checkoutButton = page.locator('.action-block button');
    this.cartIcon = page.locator('.cart-icon');
  }

  /**
   * Locate the cart item row for a given product name.
   * @param {string} productName
   */
  itemRow(productName) {
    // scope to the cart-items container and pick the first matching row
    return this.page.locator(`.cart-items .cart-item:has-text("${productName}")`).first();
  }

  /**
   * Get the name text of an item in the cart.
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getItemName(productName) {
    const row = this.itemRow(productName);
    return row.locator('.product-info .product-name').innerText();
  }

  /**
   * Get the quantity value of an item.
   * @param {string} productName
   * @returns {Promise<number>}
   */
  async getItemQuantity(productName) {
    const row = this.itemRow(productName);
    const text = await row.locator('.product-total .quantity').innerText();
    // text like "1 No." -> extract number
    const match = text.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  /**
   * Get the price text of an item.
   * @param {string} productName
   * @returns {Promise<string>}
   */
  async getItemPrice(productName) {
    const row = this.itemRow(productName);
    return row.locator('.product-info .product-price').innerText();
  }

  /**
   * Remove an item from the cart by clicking its remove button.
   * @param {string} productName
   */
  async removeItem(productName) {
    const row = this.itemRow(productName);
    await row.locator('.product-remove').click();
  }

  /**
   * Click the "Proceed to checkout" button in the cart.
   */
  async openCart() {
    await this.cartIcon.click();
    // ensure preview is visible
    await this.page.waitForSelector('.cart-preview.active');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Read the cart summary (item count and total price) from header.
   * @returns {Promise<{items:number,price:number}>}
   */
  async getSummary() {
    const itemsText = await this.page.locator('.cart-info table tr:nth-child(1) strong').innerText();
    const priceText = await this.page.locator('.cart-info table tr:nth-child(2) strong').innerText();
    return {
      items: Number(itemsText.trim()),
      price: Number(priceText.trim())
    };
  }
}

module.exports = { CartPage };
