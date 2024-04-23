const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pageobjects/LoginPage');
const {CheckoutForm} = require('../../pageobjects/CheckoutForm');
const {ProductsPage} = require('../../pageobjects/ProductsPage');


test.beforeEach('Proceed to checkout', async ({page})=> {
    const username = "standard_user";
    const password = "secret_sauce";
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutForm(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    await productsPage.validate();
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.goToShoppingCart();
    expect(await productsPage.isItemInCart('Sauce Labs Backpack')).toBeTruthy();
    expect(await productsPage.isCheckoutButtonVisible()).toBeTruthy();
    await productsPage.page.click('button[data-test="checkout"]');
    await checkoutPage.validateCheckoutPage();

});


test('Valid data test', async ({page})=> {
    const firstName = "Test";
    const lastName = "Testic";
    const zipCode = "11000"
    const checkoutPage = new CheckoutForm(page);
    await checkoutPage.checkoutData(firstName, lastName, zipCode);
    expect(checkoutPage.page.url()).toContain('checkout-step-two');

});

test('Cancel test', async ({page})=> {
    const firstName = "Test";
    const lastName = "Testic";
    const zipCode = "11000"
    const checkoutPage = new CheckoutForm(page);
    await checkoutPage.cancel(firstName, lastName, zipCode);
    expect(checkoutPage.page.url()).toContain('cart');

});

test('Missing firstname test', async ({page})=> {
    const firstName = "";
    const lastName = "Testic";
    const zipCode = "11000"
    const checkoutPage = new CheckoutForm(page);
    await checkoutPage.checkoutData(firstName, lastName, zipCode);
    await expect(checkoutPage.error).toContainText('Error: First Name is required');

});

test('Missing lastname test', async ({page})=> {
    const firstName = "Test";
    const lastName = "";
    const zipCode = "11000"
    const checkoutPage = new CheckoutForm(page);
    await checkoutPage.checkoutData(firstName, lastName, zipCode);
    await expect(checkoutPage.error).toContainText('Error: Last Name is required');

});

test('Missing zipcode test', async ({page})=> {
    const firstName = "Test";
    const lastName = "Testic";
    const zipCode = ""
    const checkoutPage = new CheckoutForm(page);
    await checkoutPage.checkoutData(firstName, lastName, zipCode);
    await expect(checkoutPage.error).toContainText('Error: Postal Code is required');

});

test('Missing all data test', async ({page})=> {
    const firstName = "";
    const lastName = "";
    const zipCode = ""
    const checkoutPage = new CheckoutForm(page);
    await checkoutPage.checkoutData(firstName, lastName, zipCode);
    await expect(checkoutPage.error).toContainText('Error: First Name is required');

});



