const {test, expect} = require("@playwright/test");

test("Homework", async ({page})=>{

    
    const cardTitles = page.locator(".card-body b");
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const login = page.locator("#login");
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await userEmail.fill("covleac@gmail.com");
    await userPassword.fill("Emm@2022")
    await login.click();
   // await page.waitForLoadState("networkidle");
   await cardTitles.first().waitFor();
   const titles = await cardTitles.allTextContents();
   console.log(titles);
});

test.only ("Client App login" , async ({page}) => 
{
    const email = "covleac@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator (".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Emm@2022")
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for ( let i=0; i < count; ++i)
    {
    if ( await products.nth(i).locator("b").textContent() ===productName)
    {
        // add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").last().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("li[class='totalRow'] button[type='button']").click();
    await page.locator("input[value='4542 9931 9292 2293']").fill("8989 8989 8989 8989");
    await page.locator("(//input[@type='text'])[2]").fill("123");
    await page.locator("(//input[@type='text'])[3]").fill("Cosmin");
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();
    await expect (page.locator(".mt-1.ng-star-inserted")).toHaveText(" * Coupon Applied ");
    await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i =0;i< optionsCount; ++i) 
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
        expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".btnn.action__submit.ng-star-inserted").click();
        // await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const confirm = await page.locator(".hero-primary").textContent();
        console.log(confirm);
        const orderId = await page.locator("label[class='ng-star-inserted']").textContent();
        console.log(orderId);
        await page.locator("//button[@routerlink='/dashboard/myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = await page.locator("tbody tr");
        for ( let i =0; i<await rows.count(); ++i)
        {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
         const orderIdDetails = await page.locator(".col-text").textContent();
        expect (orderId.includes(orderIdDetails)).toBeTruthy();






});