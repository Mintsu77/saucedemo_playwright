import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage';

test('Add Item', async ({ page }) => {
  //--- Arrange: Vaiable / Login ---
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const myShoppingList = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt'
  ];

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //--- Action: Select Product ---
  await inventoryPage.addItemToCart(myShoppingList);

  //--- Assert: Check Result ---
  await inventoryPage.verifyCartBadgeCount(myShoppingList.length.toString());
  await inventoryPage.verifyButtonChangedToRemove(myShoppingList);

  //Screen Shot Test Result
  await page.screenshot ({
    path: 'test-result/screenshots/TC004-inven-cart-add-item.png',
    fullPage: true
  });

  console.log('✅ TC004-inven-cart-add-item Passed!!');
});