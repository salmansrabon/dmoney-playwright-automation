import { test, expect } from '@playwright/test';
import { generateRadnomNumber, getLastUser } from '../utils/utils';


test("Login by admin", async ({page}) => {
    await page.goto("/");
    await page.getByRole('textbox', { name: "Email or Phone Number" }).fill("01686606909");
    await page.getByRole('textbox', { name: "Password" }).fill("1234");
    await page.getByRole('button', { name: "LOGIN" }).click();
    await page.waitForLoadState('networkidle');
});
test("Login by user",async({page})=>{
    const lastUser: any = getLastUser('./resources/users.json');
    await page.goto("/");
    await page.getByRole('textbox', { name: "Email or Phone Number" }).fill(lastUser.phoneNumber);
    await page.getByRole('textbox', { name: "Password" }).fill(lastUser.password);
    await page.getByRole('button', { name: "LOGIN" }).click();
    await page.waitForLoadState('networkidle');
})
