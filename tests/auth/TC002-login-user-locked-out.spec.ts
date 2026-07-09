import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 

test('Login Fail (user locked)', async ({ page }) => {
  //--- Vaiable / Login ---
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  
  //--- Checke Error Message ---
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');

  //--- Screen Shot Test Result ---
  await page.screenshot ({
    path: 'test-result/screenshots/TC002-login-user-locked-out.png',
    fullPage: true
  });

  console.log('✅ TC002-login-user-locked-out Passed!!');

});