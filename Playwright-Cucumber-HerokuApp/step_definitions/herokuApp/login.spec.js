import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given('que el usuario esté en la página de login', async function () {
    await this.loginHeroku.gotoLogin();
    await expect(this.page).toHaveURL(/\/login$/);
});

When('el usuario ingresa el nombre de usuario {string}', async function (usuario) {
    await this.loginHeroku.fillUsername(usuario);
});

When('el usuario ingresa la contraseña {string}', async function (contrasena) {
    await this.loginHeroku.fillPassword(contrasena);
});

When('el usuario hace clic en el botón de login', async function () {
    await this.loginHeroku.clickLogin();
});

Then('debería ver un mensaje de bienvenida {string}', async function (mensaje) {
    await expect(this.loginHeroku.getMessage()).toContainText(mensaje);
});

Then('debería ver un mensaje de error {string}', async function (mensaje) {
    await expect(this.loginHeroku.getMessage()).toContainText(mensaje);
});
