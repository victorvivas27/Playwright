
import { expect } from "@playwright/test";
import { BasePage } from "../BasePage.js";

export class LoginEcommerce extends BasePage {
    constructor(page) {
        super(page);
        this.url = '/';
    }
    async gotoPage() {
        await this.page.goto(this.url);
    }

    async inputEmail(email) {
        await this.fillField(this.selectores.email_user, email);
    }

    async inputPassword(password) {
        await this.fillField(this.selectores.password_user, password);
    }

    async clickLogin() {
        await this.byRole('button', this.selectores.sign_In);
    }

    async addProduct(producto) {
        const card = this.page.locator('.product-card', { hasText: producto });
        await card.getByRole('button', { name: this.add }).click();
    }

    async addCarrito() {
        await this.page.locator(this.selectores.carrito).click();
    }

    async comprar() {
        await this.byRole('button', this.selectores.compra);
    }

    async mensajeDialog(mensaje) {
        await this.page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe(mensaje);
            await dialog.accept();
        });
    }


    async login(email, password) {
        await this.inputEmail(email);
        await this.inputPassword(password);
        await this.clickLogin();
    }

}