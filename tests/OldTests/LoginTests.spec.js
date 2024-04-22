const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pageobjects/LoginPage');


///this is one test case //da ne pisemo func koristimo anon ()=>
///jer je js async i pokusace da izvrsi sve u isto vreme koristimo await za steps i async za funkc
test('Browser Context-Validating error login', async ({browser})=> {

    //fresh browser like incognito
    const context = await browser.newContext(); //this is default if i put page in the function
    const page = await context.newPage();
    
    const userName = page.locator('#user-name');
    const logIN = page.locator('#login-button');
    const items = page.locator(".inventory_item_description a");
    await page.goto("https://www.saucedemo.com/");
    


    console.log(await page.title());
    //csss, xpath   type == fill

    await userName.fill("standard_userr");
    await page.locator("[type= 'password']").fill("secret_sauce");
    await logIN.click();
    //it will wait for it to show up(timeout is in config)
    console.log(await page.locator("[data-test= 'error']").textContent());
    await expect(page.locator("[data-test= 'error']")).toContainText('do not match')

    await userName.fill("");
    await userName.fill("standard_user");
    await logIN.click();

  
   // console.log(await page.locator(".inventory_item_description a").first().textContent());
   // console.log(await page.locator(".inventory_item_description a").nth(1).textContent());
   // console.log(await page.locator(".inventory_item_description a").last().textContent());

   ///wont fail if not logged in it will just return 0 elements
    const allItems = await items.allTextContents();
    console.log(allItems);



});

test('Wrong password test', async ({browser})=> {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title()); 
    await page.locator('#user-name').fill("standard_user");
    await page.locator("[type= 'password']").fill("secret_saucee");
    await page.screenshot({path:'wholepage.png'});
    await page.locator('#login-button').click();
    console.log(await page.locator("[data-test= 'error']").textContent());
    await page.locator("[data-test= 'error']").screenshot({path: 'error.png'});
    await expect(page.locator("[data-test= 'error']")).toContainText('do not match');

});

test('visual', async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    expect(await page.screenshot()).toMatchSnapshot('wholepage.png');


})


test.only('Valid data test', async ({page})=> {

    const username = "standard_user";
    const password = "secret_sauce";
    
    ///console.log(await page.title());

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginData(username, password);
    expect(await loginPage.item.nth(0)).toBeVisible();

});



test('Invalid username test', async ({page})=> {

    await page.goto("https://www.saucedemo.com/");

    await page.locator('#user-name').fill("teeest");
    await page.locator("[type= 'password']").fill("secret_sauce");
    await page.locator('#login-button').click();
    
  
    console.log(await page.locator("[data-test= 'error']").textContent());
    await expect(page.locator("[data-test= 'error']")).toContainText('do not match')

    
});



///npx playwright codegen LINK


