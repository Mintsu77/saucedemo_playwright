import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  // 1. ประกาศตัวแปรประเภท Locator ไว้ด้านบน เพื่อให้หาและแก้ไขง่าย
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // 2. กำหนดพิกัด (Selectors) ให้กับตัวแปรผ่าน Constructor
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  // 3. สร้างฟังก์ชันการทำงาน (Actions) ของหน้านี้
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}