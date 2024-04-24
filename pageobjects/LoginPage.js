const {expect} = require('@playwright/test');

const validUsername = "standard_user";
const validPassword = "secret_sauce";
const invalidUsername = "test";
const invalidPassword = "testtt";
const emptyUsername = "";
const emptyPassword = "";

class LoginPage {

constructor(page){

    this.page = page;
    this.signInButton = page.locator('#login-button');
    this.userName = page.locator('#user-name');
    this.password = page.locator("[type= 'password']");
    this.error = page.locator("[data-test= 'error']");
    this.item = page.locator(".inventory_item_description a");
}

async goTo(){

    await this.page.goto("https://www.saucedemo.com/");

}

async validLogin(){
    await this.userName.fill(validUsername);
    await this.password.fill(validPassword);
    await this.signInButton.click();
}
async invalidUsername(){
    await this.userName.fill(invalidUsername);
    await this.password.fill(validPassword);
    await this.signInButton.click();
    await expect(this.error).toContainText('Epic sadface');
}

async invalidPassword(){

    await this.userName.fill(validUsername);
    await this.password.fill(invalidPassword);
    await this.signInButton.click();
    await expect(this.error).toContainText('Epic sadface');
}

async noData(){

    await this.userName.fill(emptyUsername);
    await this.password.fill(emptyPassword);
    await this.signInButton.click();
    await expect(this.error).toContainText('Epic sadface');
}


}

module.exports = {LoginPage};