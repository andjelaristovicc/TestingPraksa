class LoginPage {

constructor(page){

    this.page = page;
    this.signInButton = page.locator('#login-button');
    this.userName = page.locator('#user-name');
    this.password = page.locator("[type= 'password']");
    this.error = page.locator("[data-test= 'error']");
}

async goTo(){

    await this.page.goto("https://www.saucedemo.com/");

}

async loginData(username, password){
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
}

/* async invalidData(error){
    await this.userName.fill(username);
    await this.password.fill(password);

}  */



}

module.exports = {LoginPage};