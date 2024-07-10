import { Page } from "playwright";
import { expect } from "playwright/test";

export class OrderConfirmationPage {
    private readonly page:Page

    constructor(page:Page){
        this.page = page
    }


    public async validateConfirmationScreen(){
        await expect(this.page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
        await expect(this.page.locator('img.pony_express')).toBeVisible()

    }
}