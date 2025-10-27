import { test, expect } from '@playwright/test';
import { getLastUser } from '../utils/utils';
import { LoginPage } from '../pages/login.pom';
import { Person } from '../models/Person.model';


test("Login by admin", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(`${process.env.ADMIN_MOBILE}`, `${process.env.ADMIN_PASSWORD}`);
    
    const headingActual= await page.getByRole('heading',{name:"User Profile"}).textContent();
    expect(headingActual).toContain("User Profile");
    await expect(page).toHaveURL(/.*\/profile/);
});

test("Login by user", async({page}) => {
    const lastUser: Person = getLastUser('./resources/users.json');
    const loginPage = new LoginPage(page);
    await loginPage.login(lastUser.phoneNumber, lastUser.password);

    const headingActual= await page.getByRole('heading',{name:"User Profile"}).textContent();
    expect(headingActual).toContain("User Profile");
    await expect(page).toHaveURL(/.*\/profile/);
})
