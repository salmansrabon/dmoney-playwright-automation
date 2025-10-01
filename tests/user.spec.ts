import { test, expect, Page } from '@playwright/test';
import { generateRadnomNumber, saveJsonData } from '../utils/utils';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../pages/login.pom';
import { UserPage } from '../pages/user.pom';


test.describe.serial("User Tests", () => {
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test.beforeAll(async () => {
        const loginPage = new LoginPage(page);
        await loginPage.login("01686606909", "1234");
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
        
        const userPage = new UserPage(page);
        await userPage.createUser(person);
        await userPage.searchUser(person.email);
        
        await expect(page.getByRole('main')).toContainText('Total: 1');
        saveJsonData(person, './resources/users.json');
    });
});
