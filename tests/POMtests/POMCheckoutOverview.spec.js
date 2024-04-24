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
    await checkoutPage.checkoutData();
    await checkoutPage.validateCheckoutPage();

});

test('Finish test', async ({page})=> {
    const poManager = new POmanager(page);
    const overviewPage = poManager.getOverviewPage();
    await overviewPage.finish();
    await overviewPage.validateCompletion();

});

test('Cancel test', async ({page})=> {
    const poManager = new POmanager(page);
    const overviewPage = poManager.getOverviewPage();
    await overviewPage.cancel();
    await overviewPage.validateGettingBack();

});