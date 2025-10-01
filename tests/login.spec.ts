import { test, expect, Page } from '@playwright/test';

test.describe.serial("Login Tests", () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test("Login by admin", async () => {
        await page.goto("https://dmoneyportal.roadtocareer.net/login");
        await page.getByRole('textbox', { name: "Email or Phone Number" }).fill("01686606909");
        await page.getByRole('textbox', { name: "Password" }).fill("1234");
        await page.getByRole('button', { name: "LOGIN" }).click();
        await page.waitForLoadState('networkidle');
    });

    test("Create new user", async () => {
        const menuElem = await page.locator("//span[contains(text(),'Create User')]");
        await menuElem.nth(0).click();
        await page.pause();
    });
});
