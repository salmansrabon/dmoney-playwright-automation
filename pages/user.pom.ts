import { Page } from '@playwright/test';
import {Person} from '../models/Person.model';

export class UserPage {
  constructor(private page: Page) {}

  async clickCreateUserMenu() {
    const menuElem = await this.page.locator("//span[contains(text(),'Create User')]");
    await menuElem.nth(0).click();
  }

  async fillName(name: string) {
    await this.page.getByRole('textbox', { name: "Name" }).fill(name);
  }

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: "Email" }).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByRole('textbox', { name: "Password" }).fill(password);
  }

  async fillPhoneNumber(phoneNumber: string) {
    await this.page.getByRole('textbox', { name: "Phone Number" }).fill(phoneNumber);
  }

  async fillNID(nid: string) {
    await this.page.getByRole('textbox', { name: "NID" }).fill(nid);
  }

  async selectRole(role: string) {
    await this.page.getByRole('combobox', { exact: true }).click();
    await this.page.getByRole('option', { name: role }).click();
  }

  async clickCreateUserButton() {
    await this.page.getByRole('button', { name: 'Create User' }).click();
  }

  async searchUser(searchText: string) {
    await this.page.getByRole('textbox', { name: 'Search' }).fill(searchText);
  }

  async createUser(person: Person) {
    await this.clickCreateUserMenu();
    await this.fillName(person.fullName);
    await this.fillEmail(person.email);
    await this.fillPassword(person.password);
    await this.fillPhoneNumber(person.phoneNumber);
    await this.fillNID(person.nid);
    await this.selectRole(person.role || 'Customer');
    await this.clickCreateUserButton();
  }
}
