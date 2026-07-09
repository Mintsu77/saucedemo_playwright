import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage';

test('Add Item', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const myShoppingList = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt'
  ];
  
  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Check Home Page
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //Select Product
  await inventoryPage.addItemToCart(myShoppingList);

  //Check Cart Count
  await inventoryPage.verifyCartBadgeCount(myShoppingList.length.toString());

  //Check Button Add to cart change to Button Remove
  await inventoryPage.verifyButtonChangedToRemove(myShoppingList);

  //Screen Shot Test Result
  await page.screenshot ({
    path: 'test-result/screenshots/inventory-and-cart-add-item.png',
    fullPage: true
  });

  console.log('✅ TC004_Add_Item_&_Cart Passed!!');
});