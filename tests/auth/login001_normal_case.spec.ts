import { test, expect } from '@playwright/test';

// 1. ต้อง import คลาสเข้ามาใช้งานก่อน (ตรวจสอบ path ให้ถูกต้องตามโครงสร้างเครื่องของคุณ)
import { LoginPage } from '../../src/pages/LoginPage'; 

test('Login Success', async ({ page }) => {
  
  // 2. เรียกใช้งานพิมพ์เขียว (New Instance) โดยส่งค่า page ของ Playwright เข้าไป
  const loginPage = new LoginPage(page);
  
  // 3. สั่งเปิดเว็บ (ย้ายเข้ามาอยู่ใน Page Object แล้วเช่นกัน)
  await loginPage.goto();
  
  // 4. เรียกใช้ฟังก์ชันล็อกอินสั้นๆ สวยๆ แบบที่คุณต้องการได้เลย!
  await loginPage.login('standard_user', 'secret_sauce');
  
  // 5. ทำ Assertion เช็กความสำเร็จต่อได้เลย
  await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

  //Screen Shot Test Result
  await page.screenshot ({
    path: 'test-result/screenshots/login-success.png',
    fullPage: true
  });

  console.log('✅ TC_Login_001 Passed!!');

});