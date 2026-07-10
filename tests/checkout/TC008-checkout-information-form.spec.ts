import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutInformationPage } from '../../src/pages/CheckoutInformationPage';

test('Remove Item', async ({ page }) => {
    //--- Arrange: Vaiable / Login ---
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
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

    //--- Next To Checkout Page ---
    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);

    const nagativeCase = [
        {name: 'missing-firstname', firstName: '', lastName: 'Snow', postalCode: '10000', expectedError: 'Error: First Name is required'},
        {name: 'missing-lastname', firstName: 'Jhon', lastName: '', postalCode: '10000', expectedError: 'Error: Last Name is required'},
        {name: 'missing-postalcode', firstName: 'Jhon', lastName: 'Snow', postalCode: '',      expectedError: 'Error: Postal Code is required'},
        {name: 'missing-all', firstName: '', lastName: '', postalCode: '',      expectedError: 'Error: First Name is required'},
    ];  
    
    for (const [index, testCase] of nagativeCase.entries()) {
        console.log('[Test] เริ่มทดสอบเคสที่ ${index + 1}: ${testCase.name}');

        //--- Verify Checkout Information Form (Invalid Input) ---
        await checkoutInformationPage.fillInformation(testCase.firstName, testCase.lastName, testCase.postalCode);
        await checkoutInformationPage.clickContinue();
        await checkoutInformationPage.verifyErrorMessage(testCase.expectedError);

        //--- Screen Test Result ---
        await page.screenshot ({
        path: `test-result/screenshots/TC008-case${index + 1}-${testCase.name}.png`,
        fullPage: true
        });
        await page.reload();
   }

   //--- Verify Checkout Information Form (Valid Input) ---
    await checkoutInformationPage.fillInformation('Testname', 'Testlastname', '10000');

    //--- Screen Test Result ---
    await page.screenshot ({
        path: 'test-result/screenshots/TC008-checkout-valid-input.png',
        fullPage: true
    });

    //--- Next To Checkout Overview Page ---
    await checkoutInformationPage.clickContinue();
    await expect(page).toHaveURL(/checkout-step-two/);

    //--- Screen Test Result ---
    await page.screenshot ({
        path: 'test-result/screenshots/TC008-checkout-overview.png',
        fullPage: true
    });

    console.log('✅ TC008-checkout-overview Passed!!');

});