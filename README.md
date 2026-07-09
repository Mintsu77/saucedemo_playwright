Markdown
# SauceDemo Playwright Automation

โปรเจกต์ทดสอบอัตโนมัติ (Automated Testing) สำหรับเว็บไซต์ [SauceDemo](https://www.saucedemo.com/) โดยใช้ **Playwright** ร่วมกับภาษา **TypeScript** เพื่อฝึกฝนการเขียนสคริปต์ทดสอบที่มีประสิทธิภาพและง่ายต่อการดูแลรักษา

## 🚀 ฟีเจอร์หลักและการพัฒนา
อัปเดตล่าสุดครอบคลุมโครงสร้างและระบบตรวจสอบที่ได้มาตรฐาน:

- **Page Object Model (POM):** จัดโครงสร้างโค้ดแบบแยกหน้า (LoginPage, InventoryPage, CheckoutPage) ทำให้สคริปต์สะอาดและนำกลับมาใช้ใหม่ได้ง่าย (Reusable Functions)
- **Dynamic Test Scenarios:** รองรับการเลือกสินค้าผ่าน Array เพื่อความยืดหยุ่นในการเขียนเคสทดสอบ
- **Robust Assertions:** เพิ่มฟังก์ชันกลางสำหรับคำนวณราคา (Price Calculation Verification) เพื่อตรวจสอบความถูกต้องของยอดรวมและภาษีอัตโนมัติ
- **Automated CI/CD Pipeline:** ติดตั้ง **GitHub Actions** เพื่อรันเทสอัตโนมัติทุกครั้งที่มีการ Push โค้ด และตั้งเวลารันเทสทุกเที่ยงคืน (Daily Nightly Build) เพื่อตรวจสอบความเสถียรของระบบอย่างต่อเนื่อง

## 🧪 Test Cases
| Case ID | Description | Status |
- | **TC-001** | Login Success | ✅ |
- | **TC-002** | Login Fail User Locked Out | ✅ |
- | **TC-003** | Login Fail Invalid Password | ✅ |
- | **TC-004** | Add Product To Cart | ✅ |
- | **TC-005** | Product Sorting (Filter Price Low to High) | ✅ |
- | **TC-006** | Remove Product Out Of Cart | ✅ |
- | **TC-000** | E2E Checkout: สั่งซื้อสินค้าและตรวจสอบความถูกต้องของราคารวม | ✅ |

## 🛠️ Tech Stack
- **Framework:** Playwright (TypeScript)
- **Architecture:** Page Object Model (POM)
- **CI/CD:** GitHub Actions (Cron Job: Daily @ 00:00 ICT)

## 📦 การติดตั้งและการรันเทส
หากต้องการรันโปรเจกต์ในเครื่องของคุณ:

1. Clone โปรเจกต์นี้
2. ติดตั้ง Dependencies:
   ```bash
   npm install
