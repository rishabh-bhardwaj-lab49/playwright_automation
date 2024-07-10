import { Page } from "playwright";

export default class CheckoutPage{

    private page:Page;
    constructor(page:Page){
        this.page = page;
    }

    get continueShoppingBtn(){
        return this.page.getByText('Continue Shopping')
    }

    get checkOutBtn(){
        return this.page.getByText('CHECKOUT')
    }

    get finishBtn(){
        return this.page.getByText('FINISH')
    }

    public async fillCheckoutInfo(firstName:string, lastName:string, zipCode:string){
        await this.page.getByPlaceholder('First Name').fill(firstName)
        await this.page.getByPlaceholder('Last Name').fill(lastName)
        await this.page.getByPlaceholder('Zip/Postal Code').fill(zipCode)
        await this.page.getByText('CONTINUE').click()
    }

}