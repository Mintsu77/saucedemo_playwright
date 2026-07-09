import { test, expect } from '@playwright/test';

// 1. ต้อง import คลาสเข้ามาใช้งานก่อน (ตรวจสอบ path ให้ถูกต้องตามโครงสร้างเครื่องของคุณ)
import { LoginPage } from '../../src/pages/LoginPage'; 

test('Login Fail (Invalid Password)', async ({ page }) => {
  
  // 2. เรียกใช้งานพิมพ์เขียว (New Instance) โดยส่งค่า page ของ Playwright เข้าไป
  const loginPage = new LoginPage(page);
  
  //Open Website
  await loginPage.goto();
  
  //Input username, password
  await loginPage.login('secret_sauce', 'secret_sauce');
  
  //Checker Error Message
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');

  //Screen Shot Test Result
  await page.screenshot ({
    path: 'test-result/screenshots/login-invalid-password.png',
    fullPage: true
  });

  console.log('✅ TC003_Invalid_Login Passed!!');

});