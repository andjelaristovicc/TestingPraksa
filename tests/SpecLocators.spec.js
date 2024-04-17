const {test, expect} = require('@playwright/test');


test('Playwright spec locators', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    ///getbylabel is text between label tags
    ///it will click anywhere where the clickable operation is in that area
    ///npx playwright test --ui
    //getByPlaceholder 
    //getByRole("button", {name: '  '}).click();

    ///await page.locator("app-card").filter({hasText: "NAME"}).getbyRole("button").click();
   
  });