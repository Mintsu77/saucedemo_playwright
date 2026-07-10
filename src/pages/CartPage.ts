import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }
  /**
   * ฟังก์ชัน ตรวจสอบชื่อสินค้าในตระกร้า
   */
  async verifyItemInCart(cartItem: string[]) { 
    for (const item of cartItem) {
      const itemNameLocator = this.page.locator('[data-test="inventory-item-name"]').getByText(item);
      await expect(itemNameLocator).toBeVisible();
      console.log(`[POM] ตรวจสอบสำเร็จ: พบสินค้า "${item}" แสดงอยู่ในตะกร้าเรียบร้อย`);
    }
  }
  /**
   *  ฟังก์ชันสำหรับกดปุ่ม Checkout เพื่อไปหน้ากรอกข้อมูลถัดไป
   */
  async clickCheckout() {
    await this.checkoutButton.click();
    console.log('[POM] กดปุ่ม Checkout เรียบร้อย กำลังไปหน้ากรอกข้อมูล');
  }
}