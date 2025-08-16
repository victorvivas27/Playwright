export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async fillField(selector, valor) {
        await this.page.locator(selector).fill(valor);
    }

    async byRole(role, name) {
        await this.page.getByRole(role, { name }).click();
    }
}
