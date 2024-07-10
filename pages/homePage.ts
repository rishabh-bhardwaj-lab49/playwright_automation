import { Page, Locator, expect } from '@playwright/test'
export default class HomePage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    public get homePageLogo(){
        return this.page.locator('.app_logo')
    }

    public get productsLabel(){
        return this.page.getByText('Products')
    }

    public get allProductsCart(){
        return this.page.locator('.btn_primary.btn_inventory')
    }

    public get shoppingCartIcon() {
        return this.page.locator('.shopping_cart_container')
    }

    public get cartItemCount(){
        return this.page.locator('.fa-layers-counter.shopping_cart_badge')
    }

    public async addItemsToCart(numberOfItemsToSelect:number){
        console.log(this.allProductsCart.count())
        let i = 0
        while(i <= numberOfItemsToSelect){
            await this.allProductsCart.nth(i).click()
            await this.page.waitForTimeout(2000)
            i++;
        }
    }

    public async addItemsToCartByItemName(itemsToSelect:string[]){
        console.log(this.allProductsCart.count())
        let i = 0
        while(i < itemsToSelect.length){
            await this.page.locator('.inventory_item').filter({hasText:itemsToSelect[i]}).locator('.btn_primary.btn_inventory').click()
            await this.page.waitForTimeout(2000)
            i++;
        }
    }









    // async createNewPost() {
    //     await this.postLink.click()
    // }
    // async navigateToHome() {
    //     await this.homeLink.click()
    // }
    // async navigateToLogin() {
    //     await this.loginLink.click()
    // }
    // async navigateToGlobalFeed() {

    //     await this.globalfeedList.click()
    // }
    // async validateLogin() {

    //     await expect(this.loginLink).not.toBeVisible()
    // }
}