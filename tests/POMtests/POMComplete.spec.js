const {test, expect} = require('@playwright/test');
const {POmanager} = require('../../pageobjects/POMmanager');

test.beforeEach('Proceed to checkout', async ({page})=> {
    const poManager = new POmanager(page);
    const productsPage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();
    const checkoutPage = poManager.getCheckoutPage();
    const overviewPage = poManager.getOverviewPage();
    const completePage = poManager.getCompletePage();
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
    await overviewPage.finish();
    await completePage.validateComplete();
});

test.only('Back Home test', async ({page})=> {
    const poManager = new POmanager(page);
    const completePage = poManager.getCompletePage();
    await completePage.back();
    await completePage.validateBack();

});