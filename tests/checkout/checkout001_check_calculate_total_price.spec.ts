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
  
  //Select Product
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  
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

  //Check Calculate Total Price
  //ดึง Text จากหน้าเว็บ
  const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
  const taxText = await page.locator('.summary_tax_label').textContent();
  const totalText = await page.locator('.summary_total_label').textContent();

  //ใช้ Regular Expression (regex) ตัดตัวหนังสือออก ให้เหลือเฉพาะตัวเลขและจุดทศนิยม
  const itemTotalNum = parseFloat(itemTotalText!.replace(/[^0-9.]/g, ''));
  const taxNum = parseFloat(taxText!.replace(/[^0-9.]/g, ''));
  const totalNumFromWeb = parseFloat(totalText!.replace(/[^0-9.]/g, ''));

  //คำนวณ Total Price
  const calculatedTotal = itemTotalNum + taxNum;

  //เปรียบเทียบค่าที่คำนวณกับที่แสดงบนเว็บ
  expect(calculatedTotal).toBeCloseTo(totalNumFromWeb, 2);
  console.log(`ตรวจสอบราคาสำเร็จ! คำนวณได้: ${calculatedTotal} | บนเว็บแสดง: ${totalNumFromWeb}`);
  
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');

  console.log('✅ TC_Checkout_001 Passed!!');
});