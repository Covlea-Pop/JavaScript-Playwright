const {test, expect} = require("@playwright/test");
const { text } = require("stream/consumers");



test("Browser Context Playwright test", async ({browser})=>{

    
    const context = await browser.newContext();
    const page = await context.newPage();
    const cardTitles = page.locator(".card-body a");
    const userName = page.locator("#username");
    const signIn  = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning")
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await page.locator("[style*='block']").textContent("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log( await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.allTextContents());


});



test("UI Controls", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn  = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect ( await page.locator("#terms").isChecked()).toBeFalsy();
    await expect (documentLink).toHaveAttribute("class",'blinkingText');
   // await page.pause();






});

test("Child window hadl", async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([

        context.waitForEvent("page"),//listen for any new page
        documentLink.click(), 
     ])//new page is opened
        const text = await newPage.locator(".red").textContent();
        const arrayText = text.split("@")
        const domain = arrayText[1].split(" ") [0]
       console.log(domain);
       await page.locator("#username").fill(domain);
       console.log(await page.locator("#username").textContent());








})



test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?gws_rd=ssl');
  await page.getByRole('button', { name: 'Acceptă tot' }).click();
  await page.getByLabel('Caută', { exact: true }).click();
  await page.getByLabel('Caută', { exact: true }).fill('rahul shetty academy');
  await page.getByText('rahul shetty academy', { exact: true }).click();
  await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
  await page.getByRole('link', { name: 'VIEW ALL COURSES' }).click();
});