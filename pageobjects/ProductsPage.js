const {expect} = require('@playwright/test');
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

  async addToCart(item) {
    await this.page.click(`[data-test="add-to-cart-${item}"]`);
  }

  async removeFromCart(item) {
    await this.page.click(`[data-test="remove-${item}"]`);
  }

  async goToShoppingCart() {
    await this.page.click('[data-test="shopping-cart-link"]');
  }


  async isItemInCart(item) {
    const itemName = await this.page.textContent(`.inventory_item_name >> text="${item}"`);
    return itemName === item;
  }
  

  async isCheckoutButtonVisible() {
    const button = await this.page.locator('button[data-test="checkout"]');
    return !await button.isHidden();
  }

  async isButtonHidden(item) {
    const button = await this.page.locator(`[data-test="remove-${item}"]`);
    return await button.isHidden();
  }

  async isItemRemoved(item) {
    const removedItem = await this.page.locator(`.removed_cart_item[title="${item}"]`);
    return removedItem !== null;
  }

  async isCheckoutButtonVisible() {
    const button = await this.page.locator('button[data-test="checkout"]');
    return !await button.isHidden();
  }


}

module.exports = {ProductsPage};