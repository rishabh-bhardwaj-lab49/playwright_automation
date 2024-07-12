import { When, Then } from "@cucumber/cucumber";
import { Propertyreader } from "../../../utility/PropertyReader";
import LoginPage from "../../../pages/loginPage";
import { pageFixture } from "../../hooks/pageFixture";
import { expect } from "playwright/test";

let userConfigPropReader:Propertyreader
let loginPage:LoginPage

When('User enters invalid credentials to login', async function () {
    userConfigPropReader = new Propertyreader('userConfig.properties')
    loginPage = new LoginPage(pageFixture.page)
    let u_name = userConfigPropReader.getProperty('lockedOutUser')
    let password = userConfigPropReader.getProperty('password')
    await loginPage.performLogin(u_name, password)
});

Then('User validates the error message displayed', async function(){
    expect(await loginPage.errorMessage.textContent()).toContain("Sorry, this user has been locked out.")
})