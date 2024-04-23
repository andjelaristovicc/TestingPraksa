const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pageobjects/LoginPage');


test('Valid data test', async ({page})=> {
    const username = "standard_user";
    const password = "secret_sauce";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    expect(await loginPage.item.nth(0)).toBeVisible();

});


test('Wrong password test with POM', async ({page})=> {
    const username = "standard_user";
    const password = "teest";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    expect(loginPage.error).toContainText('do not match');

});

test('Invalid username test', async ({page})=> {

    const username = "test";
    const password = "secret_sauce";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    expect(loginPage.error).toContainText('do not match');

    
});


test('Empty fields test', async ({page})=> {

    const username = "";
    const password = "";
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    expect(loginPage.error).toContainText('Epic sadface');

    
});