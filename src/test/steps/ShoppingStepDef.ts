import { Given, When, Then, AfterAll } from '@cucumber/cucumber'
import { Browser, Page, chromium } from "@playwright/test"
import { expect } from '@playwright/test'

import LoginPage from "../../../pages/loginPage"
import HomePage from "../../../pages/homePage"
import CheckoutPage from '../../../pages/checkoutPage'
import { OrderConfirmationPage } from '../../../pages/orderConfirmationPage'

let browser: Browser
let page: Page
let homePage: HomePage
let loginPage: LoginPage
let checkoutPage: CheckoutPage
let orderConfirmationPage:OrderConfirmationPage


Given('User navigates to the login Page', async function () {
    browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('https://www.saucedemo.com/v1/')
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    checkoutPage = new CheckoutPage(page)
    orderConfirmationPage = new OrderConfirmationPage(page)

});

When('User enters valid credentials to login', async function () {
    await loginPage.performLogin('standard_user', 'secret_sauce')
});

Then('User validates the Home Page is displayed correctly', async function () {
    expect(await homePage.homePageLogo.isVisible())
    expect(await homePage.productsLabel.textContent()).toBe('Products')
});

When('User selects {string} and {string} product to add to Cart', async function (string, string2) {
    let itemNames = [string, string2]
    await homePage.addItemsToCartByItemName(itemNames)
  });

Then('User validates the count on the cart icon and clicks on cart icon', async function () {
     expect(await homePage.cartItemCount.textContent()).toBe('2')
     await homePage.shoppingCartIcon.click()
     await page.waitForTimeout(2500)
});

When('User clicks the checkout button and completes the transaction', async function () {
    await checkoutPage.checkOutBtn.click()
    await checkoutPage.fillCheckoutInfo('Playwright', 'Test', '201301')
    await checkoutPage.finishBtn.click()
});

Then('User validate the order confirmation screen', async function(){
     await orderConfirmationPage.validateConfirmationScreen();
});

AfterAll(async function(){
    await page.close()
    await browser.close()
})