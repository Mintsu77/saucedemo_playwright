import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutInformationPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }
  /**
   * ฟังก์ชัน กรอกข้อมูลหน้า Checkout Information Page
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    console.log(`[POM] กรอกข้อมูลสำเร็จ: ${firstName} ${lastName}, ${postalCode}`);
  }
  /**
   * ฟังก์ชัน Continue Button
   */
  async clickContinue() {
    await this.continueButton.click();
    console.log('[POM] กดปุ่ม Continue');
  }
  /**
   * ฟังก์ชัน Verify Error Message
   */
  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toContainText(expectedMessage);
    console.log(`[POM] ตรวจสอบ Error Message ถูกต้อง: "${expectedMessage}"`);
  }

}