import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 

test('Login Fail (Invalid Password)', async ({ page }) => {
  //--- Vaiable / Login ---
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('secret_sauce', 'secret_sauce');
  
  //--- Checke Error Message ---
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');

  //--- Screen Shot Test Result ---
  await page.screenshot ({
    path: 'test-result/screenshots/TC003_Invalid_Login.png',
    fullPage: true
  });

  console.log('✅ TC003_Invalid_Login Passed!!');

});