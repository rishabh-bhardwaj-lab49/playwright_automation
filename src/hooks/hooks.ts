import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "playwright";
import { pageFixture } from "./pageFixture";
import { getDate } from "../../utility/CommonMethods";
import * as fs from 'fs'

let page:Page
let browser:Browser
let context:BrowserContext

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false })
    context = await browser.newContext()
    page = await context.newPage()
    pageFixture.page = page

    await fs.promises.rm('./screenshots', { recursive: true, force: true });
})

Before(async function({pickle}){
    const date = getDate()
    const image = await pageFixture.page.screenshot({path:`screenshots/${pickle.name}_${date}.png`,type:"png"})
    this.attach(image, "image/png")
})

After(async function({pickle, result}){

    if(result?.status == Status.FAILED){}

    const date = getDate()
    const image = await pageFixture.page.screenshot({path:`screenshots/${pickle.name}_${date}.png`,type:"png"})
    this.attach(image, "image/png")
})

AfterAll(async function(){
    await pageFixture.page.close()
    await context.close()
    await browser.close()
})