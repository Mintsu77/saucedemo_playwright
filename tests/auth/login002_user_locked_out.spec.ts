import { test, expect } from '@playwright/test';

// 1. ต้อง import คลาสเข้ามาใช้งานก่อน (ตรวจสอบ path ให้ถูกต้องตามโครงสร้างเครื่องของคุณ)
import { LoginPage } from '../../src/pages/LoginPage'; 

test('Login Fail (user locked)', async ({ page }) => {
  
  // 2. เรียกใช้งานพิมพ์เขียว (New Instance) โดยส่งค่า page ของ Playwright เข้าไป
  const loginPage = new LoginPage(page);
  
  //Open Website
  await loginPage.goto();
  
  //Input username, password
  await loginPage.login('locked_out_user', 'secret_sauce');
  
  //Checker Error Message
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');

  //Screen Shot Test Result
  await page.screenshot ({
    path: 'test-result/screenshots/login-locked-user.png',
    fullPage: true
  });

  console.log('✅ TC_Login_002 Passed!!');

});