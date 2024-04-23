const {expect} = require('@playwright/test');
class CheckoutForm {

    constructor(page){
    
        this.page = page;
        this.continueBtn = page.locator('#continue');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator("#last-name");
        this.zipCode = page.locator("#postal-code");
        this.error = page.locator("[data-test= 'error']");
        this.cancelBtn = page.locator('#cancel');
    }
    
    async checkoutData(firstname, lastname, zipcode){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.continueBtn.click();
    }

    async cancel(firstname, lastname, zipcode){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.cancelBtn.click();
    }
    
    async validateCheckoutPage() {
        await expect(this.page.url()).toContain('checkout-step-one');
        }


    }
    
   
    module.exports = {CheckoutForm};