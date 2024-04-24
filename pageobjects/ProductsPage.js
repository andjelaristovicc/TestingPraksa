
const {expect} = require('@playwright/test');
const item = 'sauce-labs-backpack';
const itemLabel = 'Sauce Labs Backpack';
const url = 'checkout-step-one';
class ProductsPage{

constructor(page){
    this.page = page;
    this.itemTitle = page.locator(".inventory_item_label a");
    this.item = page.locator(".inventory_item_name");

}


async validate() {

  for(let i = this.itemTitle.first() ; i <= this.itemTitle.last(); i++ )
    await expect(i).toBeVisible();

  }

  async addToCart() {
    await this.page.click(`[data-test="add-to-cart-${item}"]`);
  }

  async removeFromCart() {
    await this.page.click(`[data-test="remove-${item}"]`);
  }

  async goToShoppingCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }


  async isItemInCart() {
    const itemName = await this.page.textContent(`.inventory_item_name >> text="${itemLabel}"`);
    return itemName === itemLabel;
  }
  

  async isCheckoutButtonVisible() {
    const button = await this.page.locator('button[data-test="checkout"]');
    return !await button.isHidden();
  }

  async isButtonHidden() {
    const button = await this.page.locator(`[data-test="remove-${item}"]`);
    return await button.isHidden();
  }

  async isItemRemoved() {
    const removedItem = await this.page.locator(`.removed_cart_item[title="${itemLabel}"]`);
    return removedItem !== null;
  }

  async isCheckoutButtonVisible() {
    const button = await this.page.locator('button[data-test="checkout"]');
    return !await button.isHidden();
  }

  async goToCheckout(){
    await this.page.click('button[data-test="checkout"]');

  }

  async isCheckoutValid(){

    expect(this.page.url()).toContain(url);
  }

}

module.exports = {ProductsPage};