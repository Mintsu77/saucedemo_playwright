import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage';

test('Remove Item', async ({ page }) => {
  //--- Arrange: Vaiable / Login ---
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const myShoppingList = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt'
  ];
  const removeList = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
  ];

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //--- Select Product ---
  await inventoryPage.addItemToCart(myShoppingList);

  //--- Check Button Changed To Remove ---
  await inventoryPage.verifyCartBadgeCount(myShoppingList.length.toString());
  await inventoryPage.verifyButtonChangedToRemove(myShoppingList);

  const currentCount = Number(await page.locator('[data-test="shopping-cart-badge"]').textContent());

  //Screen Shot Add Product
  await page.screenshot ({
    path: 'test-result/screenshots/TC006-inven-cart-add-item.png',
    fullPage: true
  });

  //--- Remove Item ---
  await inventoryPage.removeItem(removeList);

  //--- Check Button Changed To Add To Cart ---
  const expectedResult = currentCount - removeList.length;
  await inventoryPage.verifyCartBadgeCount(expectedResult.toString());
  await inventoryPage.verifyButtonChangedToAddToCart(removeList);

  //Screen Test Result
  await page.screenshot ({
    path: 'test-result/screenshots/TC006-inven-cart-remove-item.png',
    fullPage: true
  });

  console.log('✅ TC006-inven-cart-remove-item Passed!!');

});