const {test, expect} = require('@playwright/test');



test('Add to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const username = page.locator('[data-test="username"]');
    const password =  page.locator('[data-test="password"]');
    await username.click();
    await username.fill('standard_user');
    await password.click();
    await password.fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator(".inventory_item_name")).toContainText('Sauce Labs Backpack')
    await page.getByRole("button", {name: "checkout"});
   
  });



test('Remove', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
});



test('Remove from cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');


  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
});

