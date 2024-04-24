const {expect} = require('@playwright/test');
const firstname = "Test";
const lastname = "Testic";
const zipcode = "11000"
const invalidFirstName = "";
const invalidLastName = "";
const invalidZip = "";
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
    
    async checkoutData(){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.continueBtn.click();
    }

    async invalidName(){
        await this.firstName.fill(invalidFirstName);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.continueBtn.click();
    }

    async invalidLastName(){
        await this.firstName.fill(firstname);
        await this.lastName.fill(invalidLastName);
        await this.zipCode.fill(zipcode);
        await this.continueBtn.click();
    }

    async invalidZipCode(){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(invalidZip);
        await this.continueBtn.click();
    }


    async noData(){
        await this.firstName.fill(invalidFirstName);
        await this.lastName.fill(invalidLastName);
        await this.zipCode.fill(invalidZip);
        await this.continueBtn.click();
    }

    async cancel(){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.cancelBtn.click();
    }
    
    async validateCheckoutForm() {
        await expect(this.page.url()).toContain('checkout-step-one');
        }

    async validateCheckoutPage() {
        await expect(this.page.url()).toContain('checkout-step-two');
        }
    
    async validateCart() {
        await expect(this.page.url()).toContain('cart');
        }
    
    
    async validateNameError(){
        await expect(this.error).toContainText('Error: First Name is required');

    }

    async validateLastNameError(){
        await expect(this.error).toContainText('Error: Last Name is required');

    }

    async validateZipError(){
        await expect(this.error).toContainText('Error: Postal Code is required');

    }


    }
    
   
    module.exports = {CheckoutForm};