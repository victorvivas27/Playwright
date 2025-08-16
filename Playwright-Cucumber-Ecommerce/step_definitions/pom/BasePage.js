import selectores from "../../selector/selectores.js";

export class BasePage {
    constructor(page) {
        this.page = page;
        this.selectores = { ...selectores }
        this.url = '/';
    }

    async gotoPage() {
        await this.page.goto(this.url);
    }

    async fillField(selector, valor) {
        await this.page.locator(selector).fill(valor);
    }

    async byRole(role, name) {
        await this.page.getByRole(role, { name }).click();
    }
    async select(selector, label) {
        this.page.locator(selector).selectOption({ label });
    }
    async click(selector) {
        await this.page.locator(selector).click();
    }

    async inputEmail(email) {
        await this.fillField(this.selectores.email_user, email);
    }

    async inputPassword(password) {
        await this.fillField(this.selectores.password_user, password);
    }

    async logout() {
        await this.byRole('button', this.selectores.logout);
    }
} 