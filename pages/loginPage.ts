import { Page } from "@playwright/test"
export default class LoginPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
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

    public get errorMessage(){
        return this.page.locator('[data-test = "error"]')
    }

    public async performLogin(username:string, password:string){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click();
    }
}