import selectores from "../../selector/selectores.js";

import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
const {fullName_user,email_user,password_user,confirm_password_user,createAccount,errorMessage}=selectores

Given('Usuario se registra y realiza una compra completa', async function () {
    await this.registroEcommerce.gotoPage()
    await expect(this.page).toHaveURL('/');
});

/**
 * Escenario de compra completa para usuario nuevo   
 */
When('Usuario ingresa a la pagina de {string}', async function (ruta) {
    await this.page.getByRole('link', { name: ruta }).click();
});

When('Usuario ingresa {string} {string} {string} y {string} crea una cuenta', async function (
    fullName, email, password, confirm_password){
    await this.registroEcommerce.registro(fullName, email, password, confirm_password);
});


/**
 * Ecenario de error de campo requerido
 */

Then('Debería ver un mensaje de campo requerido {string}', async function (men) {
 const mensaje = await this.page.locator(email_user).evaluate(el => el.validationMessage);
    expect(mensaje).toBe(men);
    
});