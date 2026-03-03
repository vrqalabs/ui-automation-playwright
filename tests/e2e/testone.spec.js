const { test, expect } = require('@playwright/test');
const { getConfig } = require('../../config/envConfig');
const fs = require('fs');
const { HomePage } = require('../../pages/HomePage');

// load environment-specific config and data before tests run
const envConfig = getConfig();
const testData = JSON.parse(fs.readFileSync(envConfig.testDataPath, 'utf-8'));

// apply browser preference for this suite
test.use({ browserName: envConfig.browser });

test.describe(`running against ${envConfig.baseUrl} (${envConfig.appToLaunch}) on ${envConfig.browser}`, () => {
  test('title contains expected text', async ({ page }) => {
    await page.goto(envConfig.baseUrl);
    await expect(page).toHaveTitle(new RegExp(testData.expectedTitle));
  });

//   test('can search for a product', async ({ page }) => {
//     const home = new HomePage(page);
//     await page.goto(envConfig.baseUrl);
//     const term = testData.searchTerm || 'default';
//     await home.searchProduct(term);
//     const found = await home.isProductDisplayed(term);
//     await expect(found).toBeTruthy();
//   });

  test('add multiples and validate cart then remove items', async ({ page }) => {
    const home = new HomePage(page);
    const CartPage = require('../../pages/CartPage').CartPage;
    const cart = new CartPage(page);

    await page.goto(envConfig.baseUrl);
    // add 3 cucumbers and 2 tomatoes
    await home.searchProduct('Cucumber');
    await home.addProductToCart('Cucumber - 1 Kg', 3);
    await home.searchProduct('Tomato');
    await home.addProductToCart('Tomato - 1 Kg', 2);

    // open cart preview and verify quantities & prices
    await cart.openCart();
    await expect(await cart.getItemQuantity('Cucumber - 1 Kg')).toBe(3);
    await expect(await cart.getItemQuantity('Tomato - 1 Kg')).toBe(2);

    // price per item
    const cucumberPrice = Number(await cart.getItemPrice('Cucumber - 1 Kg'));
    const tomatoPrice = Number(await cart.getItemPrice('Tomato - 1 Kg'));
    // summary price
    const summary = await cart.getSummary();
    expect(summary.price).toBe(cucumberPrice * 3 + tomatoPrice * 2);

    // remove each item completely and assert they disappear and price updates
    await cart.removeItem('Cucumber - 1 Kg');
    await cart.removeItem('Tomato - 1 Kg');
    await expect(cart.itemRow('Cucumber - 1 Kg')).toHaveCount(0);
    await expect(cart.itemRow('Tomato - 1 Kg')).toHaveCount(0);
    const summaryAfter = await cart.getSummary();
    expect(summaryAfter.price).toBe(0);

    // validate empty cart message is shown
    await page.waitForSelector('.empty-cart h2');
    await expect(page.locator('.empty-cart h2').first()).toHaveText('You cart is empty!');
  });
});
