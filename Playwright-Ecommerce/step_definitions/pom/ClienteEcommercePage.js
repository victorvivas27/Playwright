const { expect } = require("@playwright/test");

class ClienteEcommercePage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            botonLogin: 'a[href="/login"]',
            fullName: { role: 'textbox', name: 'Full Name' },
            emailAdress: { role: 'textbox', name: 'Email Address' },
            password: 'input[name="password"]',
            confirmPassword: 'input[name="comfirmPassword"]',
            createAccount: 'button.w-full',
            mensajeBienvenido: 'span.font-medium',
            botonCarrito: '#product_3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > button:nth-child(2)',
            contadorCarrito: 'span.absolute',
            botonVerCarrito: 'a[href="/cart"]',
            nombreProducto_3: 'a[href="/product/3"]',
            botonComprar: 'xpath=//*[@id="root"]/div/div/div/div[2]/div[2]/div/button',
            botonIniciarSesion: '#root > div > div > div > div > form > button',
            productoAgregar: '#product_3 > div > div.p-4 > div.flex.items-center.justify-between > button',
            mensagenError: '#root > div > div > div > div > div.bg-red-50.border.border-red-200.rounded-lg.p-4.mb-6 > p'
        };
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async click(selector) {
        await this.page.locator(selector).click();
    }

    async fillByRole(roleObj, value) {
        await this.page.getByRole(roleObj.role, { name: roleObj.name }).fill(value);
    }

    async fillFullName(value) {
        await this.fillByRole(this.selectors.fullName, value);
    }

    async fillEmail(value) {
        await this.fillByRole(this.selectors.emailAdress, value);
    }

    async fillPassword(value) {
        await this.page.locator(this.selectors.password).fill(value);
    }

    async fillConfirmPassword(value) {
        await this.page.locator(this.selectors.confirmPassword).fill(value);
    }

    async clickLogin() {
        await this.click(this.selectors.botonLogin);
    }

    async clickCreateAccount() {
        await this.click(this.selectors.createAccount);
    }

    async clickIniciarSesion() {
        await this.click(this.selectors.botonIniciarSesion);
    }

    async getMensajeBienvenida() {
        return await this.page.locator(this.selectors.mensajeBienvenido).textContent();
    }

    async clickAgregarAlCarrito() {
        await this.click(this.selectors.botonCarrito);
    }

    async getContadorCarrito() {
        return await this.page.locator(this.selectors.contadorCarrito).textContent();
    }

    async clickVerCarrito() {
        await this.click(this.selectors.botonVerCarrito);
    }

    async clickAgregarProducto() {
        await this.click(this.selectors.productoAgregar);
    }

    async nombreProducto () {
        return await this.page.locator(this.selectors.nombreProducto_3).textContent();
    }

    async clickBotonComprar() {
        await this.page.locator(this.selectors.botonComprar).click();
    }

    async getMensajeError() {
        return await this.page.locator(this.selectors.mensagenError).textContent();
    }

  async verificarPaginaLogin() {
  await expect(this.page).toHaveURL(/.*\/login/);
}
}

module.exports = ClienteEcommercePage;