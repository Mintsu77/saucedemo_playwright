import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 

test('Login Success', async ({ page }) => {
  //--- Vaiable / Login ---
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  //--- Check Result ---
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //--- Screen Shot Test Result ---
  await page.screenshot ({
    path: 'test-result/screenshots/TC001-login-normal-case.png',
    fullPage: true
  });

  console.log('✅ TC001-login-normal-case Passed!!');

});