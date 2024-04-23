const {expect} = require('@playwright/test');
class Complete {

    constructor(page){
    
        this.page = page;
        this.backBtn = page.locator('#back-to-products');
    
    }

    
    async back(){
        await this.backBtn.click();
    }

    async validateComplete(){
         await expect(this.page.url()).toContain('checkout-complete');

    }

}

module.exports = {Complete};