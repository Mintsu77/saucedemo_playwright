import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage';

test('Sort Product Low Price To Hight Price', async ({ page }) => {
  //--- Arrange: Vaiable / Login ---
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //--- Sort Product Price ---
  await inventoryPage.sortProductBy('lohi');

  //--- Check Result ---
  await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');

  //Screen Shot Test Result
  await page.screenshot ({
    path: 'test-result/screenshots/TC005-inven-cart-sort-price.png',
    fullPage: true
  });

  console.log('✅ TC005-inven-cart-sort-price Passed!!');
});
