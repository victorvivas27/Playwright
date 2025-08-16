import selectores from "../../selector/selectores.js";

export class BasePage  {
    constructor(page) {
        this.page = page;
        this.selectores = { ...selectores }
    }   

    async fillField(selector, valor) {
        await this.page.locator(selector).fill(valor);
    }

    async byRole(role, name) {
        await this.page.getByRole(role, { name }).click();
    }

    async logout() {
        await this.byRole('button',this.selectores.logout);
    }
} 