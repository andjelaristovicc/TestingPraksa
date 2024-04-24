const {LoginPage} = require('../pageobjects/LoginPage');
const {CheckoutForm} = require('../pageobjects/CheckoutForm');
const {ProductsPage} = require('../pageobjects/ProductsPage');
const {CheckoutOverview} = require('../pageobjects/CheckoutOverview');
const {Complete} = require('../pageobjects/Complete');


class POmanager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.checkoutPage = new CheckoutForm(page);
        this.overviewPage = new CheckoutOverview(page);
        this.completePage = new Complete(page);
    }


    getLoginPage(){
        return this.loginPage;
    }

    getHomePage(){
        return this.productsPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getOverviewPage(){
        return this.overviewPage;
    }

    getCompletePage(){
        return this.completePage;
    }

}

module.exports = {POmanager};