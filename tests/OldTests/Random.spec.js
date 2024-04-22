const {test, expect} = require('@playwright/test');



test.beforeEach('Log into page',async({page}) =>{
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

});

test('Remove', async ({ page }) => {
  
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  
    const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(removeBtn).toBeHidden();
  
  });
  