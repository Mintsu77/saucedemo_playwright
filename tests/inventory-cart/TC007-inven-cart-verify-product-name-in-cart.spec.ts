import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';

test('Remove Item', async ({ page }) => {
    //--- Arrange: Vaiable / Login ---
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const myShoppingList = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'
    ];

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('[data-test="primary-header"]')).toContainText('Swag Labs');

    //--- Select Product ---
    await inventoryPage.addItemToCart(myShoppingList);

    //--- Go To Cart ---
    await inventoryPage.goToCart();

    //--- Verify Product Name In Cart --- 
    await cartPage.verifyItemInCart(myShoppingList);

    //--- Screen Test Result ---
    await page.screenshot ({
        path: 'test-result/screenshots/TC007-inven-cart-product-name.png',
        fullPage: true
    });

    //--- Next To Checkout Page ---
    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);

    //--- Screen Test Result ---
    await page.screenshot ({
        path: 'test-result/screenshots/TC007-inven-cart-checkout-page.png',
        fullPage: true
    });

    console.log('✅ TC007-inven-cart-verify-product-name-in-cart Passed!!');
});