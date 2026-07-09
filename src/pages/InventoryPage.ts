import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * ฟังก์ชันดึง Locator ของปุ่มจัดการสินค้าแผ่นเดียวกัน (Reusable Dynamic Locator)
   */
  getProductButton(itemName: string): Locator {
    // ใช้ได้ทั้งปุ่ม add-to-cart และ remove ของสินค้านั้นๆ บนหน้าเว็บ
    return this.page.locator(`[data-test$="-${itemName}"]`);
  }

  /**
   * ฟังก์ชันกลางสำหรับกดเพิ่มสินค้าเข้าตะกร้า
   */
  async addItemToCart(itemNames: string[]) {
    for (const item of itemNames) {
      const productButton = this.getProductButton(item);
      await productButton.click();
      console.log(`[POM] กดเพิ่มสินค้า: ${item} เข้าตะกร้าแล้ว`);
    }
  }

  /**
   * [🎯 ฟังก์ชันกลางที่เพิ่มใหม่] สำหรับตรวจสอบว่าปุ่มเปลี่ยนเป็นคำว่า Remove หรือยัง
   * @param itemName ชื่อระบุสินค้าตัวเดียวกับที่กดแอด เช่น 'sauce-labs-backpack'
   */
  async verifyButtonChangedToRemove(itemNames: string[]) {
    for (const item of itemNames) {
      const productButton = this.getProductButton(item);
      // วนลูปตรวจสอบว่าปุ่มของสินค้าทุกชิ้นในลิสต์ ต้องขึ้นคำว่า 'Remove'
      await expect(productButton).toHaveText('Remove');
      console.log(`[POM] ตรวจสอบสถานะ: ปุ่มของ ${item} เปลี่ยนเป็น 'Remove' ถูกต้อง`);
    }
  }

  /**
   * ฟังก์ชันกลางสำหรับตรวจสอบจำนวนสินค้าบนรถเข็น
   */
  async verifyCartBadgeCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
    console.log(`[POM] ตรวจสอบจำนวนรถเข็นถูกต้อง: มีสินค้าทั้งหมด ${expectedCount} ชิ้น`);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}