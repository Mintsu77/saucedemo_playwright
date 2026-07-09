import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test('E2E Checkout Success', async ({ page }) => {
  //--- Valiable / Login ---
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shoppingList = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket'
  ];
  
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');
  
  //--- Select Product --- 
  await inventoryPage.addItemToCart(shoppingList);
  await inventoryPage.goToCart();
  //--- Checkout ---
  await checkoutPage.fillInformation('test', 'test', '10000');

  //--- Check Calculate Total Price ---
  await checkoutPage.verifyTotalPriceCalculation();

  //--- Finish Order---
  await checkoutPage.finishCheckout();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');

  //--- Screen Shot Test Result ---
  await page.screenshot ({
    path: 'test-result/screenshots/TC005-checkout-success.png',
    fullPage: true
  });

  console.log('✅ TC005-e2e-checkout-success Passed!!');
});