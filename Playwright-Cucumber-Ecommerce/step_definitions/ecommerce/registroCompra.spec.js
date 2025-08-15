import selectores from "../../selector/selectores.js";

import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
const {fullName_user,email_user,password_user,confirm_password_user,createAccount,errorMessage}=selectores

Given('Usuario se registra y realiza una compra completa', async function () {
    await this.page.goto('/')
    await expect(this.page).toHaveURL('/');
});
/**
 * Escenario de compra completa para usuario nuevo   
 */
When('Usuario ingresa a la pagina de {string}', async function (ruta) {
    await this.page.getByRole('link', { name: ruta }).click();
});

When('Usuario ingresa {string} {string} {string} y {string}', async function (fullName, email, password, confirm_password) {
    await this.page.locator(fullName_user).fill(fullName);
    await this.page.locator(email_user).fill(email);
    await this.page.locator(password_user).fill(password);
    await this.page.locator(confirm_password_user).fill(confirm_password);
});

When('Usuario crea una cuenta', async function () {
    await this.page.getByRole('button', { name: createAccount }).click();
});


/**
 * Ecenario de error de campo requerido
 */

Then('Debería ver un mensaje de campo requerido {string}', async function (men) {
 const mensaje = await this.page.locator(email_user).evaluate(el => el.validationMessage);
    expect(mensaje).toBe(men);
    
});