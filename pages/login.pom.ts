import { Page } from "@playwright/test";

export class LoginPage {
//   private page: Page;
//   constructor(page: Page) {
//     this.page = page;
//   }
constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/");
  }

  async fillEmailOrPhone(emailOrPhone: string) {
    await this.page
      .getByRole("textbox", { name: "Email or Phone Number" })
      .fill(emailOrPhone);
  }

  async fillPassword(password: string) {
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
  }

  async clickLoginButton() {
    await this.page.getByRole("button", { name: "LOGIN" }).click();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async login(emailOrPhone: string, password: string) {
    await this.navigate();
    await this.fillEmailOrPhone(emailOrPhone);
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.waitForPageLoad();
  }
}
