import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given('que el usuario esté en la página de login', async function () {
    await this.page.goto('/login');                
    await expect(this.page).toHaveURL(/\/login$/);  
});

When('el usuario ingresa el nombre de usuario {string}', async function (usuario) {
    await this.page.locator('#username').fill(usuario);
});

When('el usuario ingresa la contraseña {string}', async function (contrasena) {
    await this.page.locator('#password').fill(contrasena);
});

When('el usuario hace clic en el botón de login', async function () {
    await this.page.getByRole('button', { name: 'Login' }).click();
});

Then('debería ver un mensaje de bienvenida {string}', async function (mensaje) {
    await expect(this.page.locator('#flash')).toContainText(mensaje);
});

Then('debería ver un mensaje de error {string}', async function (mensaje) {
    await expect(this.page.locator('#flash')).toContainText(mensaje);
});
