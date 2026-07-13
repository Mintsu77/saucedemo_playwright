import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutInformationPage } from '../../src/pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../src/pages/CheckoutOverviewPage';

test('Verify Checkout Overview Price', async ({ page }) => {
  //--- Arrange: Variable / Login ---
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutInformationPage = new CheckoutInformationPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);

  const shoppingList = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
  ];

  const expectedPrices = [29.99, 9.99, 15.99];
  const expectedItemTotal = expectedPrices.reduce((sum, price) => sum + price, 0);
  const expectedTax = Math.round(expectedItemTotal * 0.08 * 100) / 100;

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //--- Select Product ---
  await inventoryPage.addItemToCart(shoppingList);
  await inventoryPage.goToCart();

  //--- Go To Checkout Information Page ---
  await cartPage.clickCheckout();
  await expect(page).toHaveURL(/checkout-step-one/);

  await checkoutInformationPage.fillInformation('Testname', 'Testlastname', '10000');
  await checkoutInformationPage.clickContinue();
  await expect(page).toHaveURL(/checkout-step-two/);

  //--- Verify Price On Checkout Overview Page ---
  const itemTotal = await checkoutOverviewPage.getItemTotal();
  const tax = await checkoutOverviewPage.getTax();

  expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);
  expect(tax).toBeCloseTo(expectedTax, 2);
  console.log(`[Test] Item total ถูกต้อง: ${itemTotal} (คาดหวัง: ${expectedItemTotal})`);
  console.log(`[Test] Tax ถูกต้อง: ${tax} (คาดหวัง: ${expectedTax})`);

  //--- Screen Shot Test Result ---
  await page.screenshot({
    path: 'test-result/screenshots/TC009-checkout-overview-price.png',
    fullPage: true,
  });

  console.log('✅ TC009-checkout-overview-price Passed!!');
});
