import { Page, Locator } from "@playwright/test"
export default class LoginPage {
    private readonly page: Page
    // readonly username: Locator
    // readonly password: Locator
    // readonly loginBtn: Locator

    constructor(page: Page) {
        this.page = page
        // this.username = this.page.getByPlaceholder('Email')
        // this.password = this.page.getByPlaceholder('Password')
        // this.loginBtn = this.page.getByRole('button', { name: 'Sign in' })
    }

    public get usernameField() {
       return this.page.getByPlaceholder('Username')
    }

    public get passwordField() {
        return this.page.getByPlaceholder('Password')
    }

    public get loginButton(){
        return this.page.locator('input#login-button')
    }

    public async performLogin(username:string, password:string){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click();
    }

    // async enterUsername(strUser: string) {
    //     await this.username.fill(strUser)
    // }
    // async enterPassword(strPwd: string) {
    //     await this.password.fill(strPwd)
    // }
    // async clickLoginBtn() {
    //     await this.loginBtn.click()
    // }
    // async validLogin(strUser: string, strPwd: string) {
    //     await this.enterUsername(strUser)
    //     await this.enterPassword(strPwd)
    //     await this.clickLoginBtn();
    // }
}