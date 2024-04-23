const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pageobjects/LoginPage');
const {CheckoutForm} = require('../../pageobjects/CheckoutForm');
const {ProductsPage} = require('../../pageobjects/ProductsPage');
const {CheckoutOverview} = require('../../pageobjects/CheckoutOverview');
const {Complete} = require('../../pageobjects/Complete');

test.beforeEach('Proceed to checkout', async ({page})=> {
    const username = "standard_user";
    const password = "secret_sauce";
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutForm(page);
    const overviewPage = new CheckoutOverview(page);
    const completePage = new Complete(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    await productsPage.validate();
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.goToShoppingCart();
    expect(await productsPage.isItemInCart('Sauce Labs Backpack')).toBeTruthy();
    expect(await productsPage.isCheckoutButtonVisible()).toBeTruthy();
    await productsPage.page.click('button[data-test="checkout"]');
    await checkoutPage.validateCheckoutPage();
    const firstName = "Test";
    const lastName = "Testic";
    const zipCode = "11000"
    await checkoutPage.checkoutData(firstName, lastName, zipCode);
    await overviewPage.validateCheckoutPage();
    await overviewPage.finish();
    await completePage.validateComplete();
});

test.only('Back Home test', async ({page})=> {
    const completePage = new Complete(page);
    await completePage.back();
    expect(completePage.page.url()).toContain('inventory');

});