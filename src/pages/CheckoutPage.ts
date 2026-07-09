import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  /**
   * ฟังก์ชันกรอกข้อมูลที่อยู่สั่งซื้อ
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="checkout"]').click();
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  /**
   * [🎯 ฟังก์ชันกลางที่คุณถาม] สำหรับถอดตัวเลข ดึงค่า และตรวจสอบราคาความถูกต้องทั้งหมด
   */
  async verifyTotalPriceCalculation() {
    const itemTotalText = await this.itemTotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    // ล้างตัวอักษรด้วย regex ให้เหลือแต่ตัวเลขและจุดทศนิยม
    const itemTotalNum = parseFloat(itemTotalText!.replace(/[^0-9.]/g, ''));
    const taxNum = parseFloat(taxText!.replace(/[^0-9.]/g, ''));
    const totalNumFromWeb = parseFloat(totalText!.replace(/[^0-9.]/g, ''));

    const calculatedTotal = itemTotalNum + taxNum;

    // เปรียบเทียบค่าความถูกต้อง
    expect(calculatedTotal).toBeCloseTo(totalNumFromWeb, 2);
    console.log(`[POM] ตรวจสอบราคาสำเร็จ! คำนวณได้: ${calculatedTotal} | บนเว็บแสดง: ${totalNumFromWeb}`);
  }

  /**
   * ฟังก์ชันกดสิ้นสุดการทำงานและส่งใบสั่งซื้อ
   */
  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }
}