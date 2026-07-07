import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 

test('test', async ({ page }) => {

  //Open Website  
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  //Login
  await loginPage.login('standard_user', 'secret_sauce');

  //Check Home Page
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //View Product
  await page.locator('[data-test="item-4-title-link"]').click();

  //Add To Cart
  await page.locator('[data-test="add-to-cart"]').click();

  //View Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  //Checkout
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('test');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('test');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('10000');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');

  console.log('✅ TC_Checkout_002 Passed!!');

});