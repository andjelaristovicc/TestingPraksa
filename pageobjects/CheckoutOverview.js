const {expect} = require('@playwright/test');
class CheckoutOverview {

    constructor(page){
    
        this.page = page;
        this.finishBtn = page.locator('#finish');
        this.cancelBtn = page.locator('#cancel');
    }
    
   
    async finish(){
        await this.finishBtn.click();
    }

    async cancel(){
        await this.cancelBtn.click();
    }
    
    async validateCheckoutPage() {
        await expect(this.page.url()).toContain('checkout-step-two');
        }

    
    }
    
   
    module.exports = {CheckoutOverview};