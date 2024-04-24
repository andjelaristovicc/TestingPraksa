const {test, expect} = require('@playwright/test');
const {POmanager} = require('../../pageobjects/POMmanager');

test.beforeEach('Log into page',async({page}) =>{
    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    const productsPage = poManager.getHomePage();
    await loginPage.goTo();
    await loginPage.validLogin();
    await productsPage.validate();
  });

  test("Add item to the cart", async ({ page }) => {
    const poManager = new POmanager(page);
    const productsPage = poManager.getHomePage();
    await productsPage.addToCart();
    await productsPage.goToShoppingCart();

    expect(await productsPage.isItemInCart()).toBeTruthy();

  });
  
  test('Remove', async ({ page }) => {
    const poManager = new POmanager(page);
    const productsPage = poManager.getHomePage();
    await productsPage.addToCart();
    await productsPage.removeFromCart();
  
    expect(await productsPage.isButtonHidden()).toBeTruthy();
  });
  
  test('Remove from cart', async ({ page }) => {
    const poManager = new POmanager(page);
    const productsPage = poManager.getHomePage();
    await productsPage.addToCart();
    await productsPage.goToShoppingCart();
    await productsPage.removeFromCart();

  
    expect(await productsPage.isButtonHidden()).toBeTruthy();

    expect(await productsPage.isItemRemoved()).toBeTruthy();

  });

  test('Click Checkout Button', async ({ page }) => {
    const poManager = new POmanager(page);
    const productsPage = poManager.getHomePage();;
    await productsPage.addToCart();
    await productsPage.goToShoppingCart();
    expect(await productsPage.isItemInCart()).toBeTruthy();
    expect(await productsPage.isCheckoutButtonVisible()).toBeTruthy();
    
    await productsPage.goToCheckout();
     
    await productsPage.isCheckoutValid();
  });

  