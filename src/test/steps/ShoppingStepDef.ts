import { Given, When, Then, AfterAll } from '@cucumber/cucumber'
import { Browser, Page, chromium } from "@playwright/test"
import { expect } from '@playwright/test'

import LoginPage from "../../../pages/loginPage"
import HomePage from "../../../pages/homePage"
import CheckoutPage from '../../../pages/checkoutPage'
import { OrderConfirmationPage } from '../../../pages/orderConfirmationPage'
import { Propertyreader } from '../../../utility/PropertyReader'

let browser: Browser
let page: Page
let homePage: HomePage
let loginPage: LoginPage
let checkoutPage: CheckoutPage
let orderConfirmationPage:OrderConfirmationPage
let userConfigPropReader:Propertyreader

Given('User navigates to the login Page', async function () {
    browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('https://www.saucedemo.com/v1/')
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    checkoutPage = new CheckoutPage(page)
    orderConfirmationPage = new OrderConfirmationPage(page)
    userConfigPropReader = new Propertyreader('userConfig.properties')
});

When('User enters valid credentials to login', async function () {
    let u_name = userConfigPropReader.getProperty('username')
    let password = userConfigPropReader.getProperty('password')
    await loginPage.performLogin(u_name, password)
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
});

When('User clicks the checkout button and completes the transaction', async function () {
    let firstName = userConfigPropReader.getProperty('firstName')
    let lestName = userConfigPropReader.getProperty( 'lastName')
    let zipCode = userConfigPropReader.getProperty('zipCode')
    await checkoutPage.checkOutBtn.click()
    await checkoutPage.fillCheckoutInfo(firstName, lestName, zipCode)
    await checkoutPage.finishBtn.click()
});

Then('User validate the order confirmation screen', async function(){
     await orderConfirmationPage.validateConfirmationScreen();
});

AfterAll(async function(){
    await page.close()
    await browser.close()
})