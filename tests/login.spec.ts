import { test, expect, Page } from '@playwright/test';
import { generateRadnomNumber } from '../utils/utils';
import { faker } from '@faker-js/faker';


test.describe.serial("Login Tests", () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test("Login by admin", async () => {
        await page.goto("/");
        await page.getByRole('textbox', { name: "Email or Phone Number" }).fill("01686606909");
        await page.getByRole('textbox', { name: "Password" }).fill("1234");
        await page.getByRole('button', { name: "LOGIN" }).click();
        await page.waitForLoadState('networkidle');
    });

    test("Create new user", async () => {
        interface Person{
            fullName:string,
            email:string,
            password:string,
            phoneNumber:string,
            nid:string
        }
        const person:Person={
            fullName:faker.person.fullName(),
            email:`salmansrabon+${generateRadnomNumber(1000,9999)}@gmail.com`,
            password:"1234",
            phoneNumber:"0130"+generateRadnomNumber(1000000,9999999),
            nid:generateRadnomNumber(100000000,999999999).toString()
        }
        const menuElem = await page.locator("//span[contains(text(),'Create User')]");
        await menuElem.nth(0).click();
        await page.getByRole('textbox',{name:"Name"}).fill(person.fullName);
        await page.getByRole('textbox',{name:"Email"}).fill(person.email);
        await page.getByRole('textbox',{name:"Password"}).fill(person.password);
        await page.getByRole('textbox',{name:"Phone Number"}).fill(person.phoneNumber);
        await page.getByRole('textbox',{name:"NID"}).fill(person.nid)
        await page.getByRole('combobox', { exact:true }).click();
        await page.getByRole('option', { name: 'Customer' }).click();
        await page.getByRole('button', { name: 'Create User' }).click();
        //await page.pause();
    });
});
