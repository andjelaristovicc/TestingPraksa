const {test, expect} = require('@playwright/test');
const {POmanager} = require('../../pageobjects/POMmanager');


test.beforeEach('Proceed to checkout', async ({page})=> {
    const poManager = new POmanager(page);
    const productsPage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();
    const checkoutPage = poManager.getCheckoutPage();
    await loginPage.goTo();
    await loginPage.validLogin();
    await productsPage.validate();
    await productsPage.addToCart();
    await productsPage.goToShoppingCart();
    expect(await productsPage.isItemInCart()).toBeTruthy();
    expect(await productsPage.isCheckoutButtonVisible()).toBeTruthy();
    await productsPage.goToCheckout();
    await checkoutPage.validateCheckoutForm();
});



test('Valid data test', async ({page})=> {
 
    const poManager = new POmanager(page);
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkoutData();
    await checkoutPage.validateCheckoutPage();

});

test('Cancel test', async ({page})=> {
    const poManager = new POmanager(page);
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.cancel();
    await checkoutPage.validateCart();

});

test('Missing firstname test', async ({page})=> {
    const poManager = new POmanager(page);
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.invalidName();
    await checkoutPage.validateNameError();

});

test('Missing lastname test', async ({page})=> {
    const poManager = new POmanager(page);
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.invalidLastName();
    await checkoutPage.validateLastNameError();

});

test('Missing zipcode test', async ({page})=> {
    const poManager = new POmanager(page);
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.invalidZipCode();
    await checkoutPage.validateZipError();
    

});

test('Missing all data test', async ({page})=> {
    const poManager = new POmanager(page);
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.noData();
    await checkoutPage.validateNameError();

});



