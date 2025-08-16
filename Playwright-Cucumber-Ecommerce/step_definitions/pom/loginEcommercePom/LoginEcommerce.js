
import { expect } from "@playwright/test";
import { BasePage } from "../BasePage.js";

export class LoginEcommerce extends BasePage {
    constructor(page) {
        super(page);
       
    }

    async clickLogin() {
        await this.byRole('button', this.selectores.sign_In);
    }

    async addProduct(producto) {
        const card = this.page.locator('.product-card', { hasText: producto });
        await card.getByRole('button', { name: this.add }).click();
    }

    async addCarrito() {
        await this.click(this.selectores.carrito);
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
    async filtrar(categoria) {
        await this.select(this.selectores.allCategory,categoria);
    }

    async ordenar(orden) {
        await this.select(this.selectores.sortBy, orden);
    }
    async eliminaProductoCarrito(producto) {
     await this.click(this.selectores.eliminaProductoCarrito);
    }   


    async login(email, password) {
        await this.inputEmail(email);
        await this.inputPassword(password);
        await this.clickLogin();
    }

}