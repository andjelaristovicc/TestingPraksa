const {test, expect} = require('@playwright/test');
const {ProductsPage} = require('../../pageobjects/ProductsPage');
const {LoginPage} = require('../../pageobjects/LoginPage');

test.beforeEach('Log into page',async({page}) =>{
    const username = "standard_user";
    const password = "secret_sauce";
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    await productsPage.validate();
  });

  test("Add item to the cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.goToShoppingCart();

    expect(await productsPage.isItemInCart('Sauce Labs Backpack')).toBeTruthy();

  });
  
  test('Remove', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.removeFromCart('sauce-labs-backpack');
  
    expect(await productsPage.isButtonHidden('sauce-labs-backpack')).toBeTruthy();
  });
  
  test('Remove from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.addToCart('sauce-labs-bike-light');
    await productsPage.goToShoppingCart();
    await productsPage.removeFromCart('sauce-labs-backpack');
    await productsPage.removeFromCart('sauce-labs-bike-light');
  
    expect(await productsPage.isButtonHidden('sauce-labs-backpack')).toBeTruthy();
    expect(await productsPage.isButtonHidden('sauce-labs-bike-light')).toBeTruthy();
    expect(await productsPage.isItemRemoved('Sauce Labs Backpack')).toBeTruthy();
    expect(await productsPage.isItemRemoved('Sauce Labs Bike Light')).toBeTruthy();
  });

  test.only('Click Checkout Button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.goToShoppingCart();
    expect(await productsPage.isItemInCart('Sauce Labs Backpack')).toBeTruthy();
    expect(await productsPage.isCheckoutButtonVisible()).toBeTruthy();
    
    await productsPage.page.click('button[data-test="checkout"]');
     
    expect(productsPage.page.url()).toContain('checkout-step-one');
  });

  