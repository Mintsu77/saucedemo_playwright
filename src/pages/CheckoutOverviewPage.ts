import { type Page, type Locator } from '@playwright/test';

export class CheckoutOverviewPage {
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
   * แปลงข้อความราคาบนหน้าเว็บให้เป็นตัวเลข
   */
  private parsePrice(text: string | null): number {
    return parseFloat(text!.replace(/[^0-9.]/g, ''));
  }

  /**
   * ดึงค่า Item total จากหน้า Checkout Overview
   */
  async getItemTotal(): Promise<number> {
    const itemTotalText = await this.itemTotalLabel.textContent();
    const itemTotal = this.parsePrice(itemTotalText);
    console.log(`[POM] ดึงค่า Item total: ${itemTotal}`);
    return itemTotal;
  }

  /**
   * ดึงค่า Tax จากหน้า Checkout Overview
   */
  async getTax(): Promise<number> {
    const taxText = await this.taxLabel.textContent();
    const tax = this.parsePrice(taxText);
    console.log(`[POM] ดึงค่า Tax: ${tax}`);
    return tax;
  }
}
