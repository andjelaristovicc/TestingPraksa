const {test, expect} = require('@playwright/test');
const {POmanager} = require('../../pageobjects/POMmanager');


test('Valid data test', async ({page})=> {
    
    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin();
    expect(await loginPage.item.nth(0)).toBeVisible();

});


test('Wrong password test with POM', async ({page})=> {
   
    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.invalidPassword();
    

});

test('Invalid username test', async ({page})=> {

    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.invalidUsername();
    

    
});


test('Empty fields test', async ({page})=> {

    const poManager = new POmanager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.noData();
   
    
});