import { test, expect } from '@playwright/test';
import { getLastUser, User } from '../utils/utils';
import { LoginPage } from '../pages/login.pom';


test("Login by admin", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("01686606909", "1234");
});

test("Login by user", async({page}) => {
    const lastUser: User = getLastUser('./resources/users.json');
    const loginPage = new LoginPage(page);
    await loginPage.login(lastUser.phoneNumber, lastUser.password);
})
