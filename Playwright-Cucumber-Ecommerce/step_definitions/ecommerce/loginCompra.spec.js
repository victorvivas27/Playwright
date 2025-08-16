
import selectores from "../../selector/selectores.js";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
const { errorMessage,email_user} = selectores;

/**
 * Escenario de compra completa para un cliente existente
 */

Given('Cliente existente realiza una compra completa', async function () {
    await this.loginEcommerce.gotoPage();
    await expect(this.page).toHaveURL('/');

});

When('Cliente ingresa a la pagina de {string}', async function (ruta) {
    await this.loginEcommerce.byRole('link', ruta);
    
});

When('Cliente ingresa su correo {string} y contraseña {string} inicia sesión', async function (email, password) {
    await this.loginEcommerce.login(email, password);
});

When('Cliente selecciona un producto {string} y agrega el producto al carrito', async function (producto) {
   await this.loginEcommerce.addProduct(producto);
});

When('Cliente accede al carrito de compra', async function () {
    await this.loginEcommerce.addCarrito();
});

When('Cliente completa la compra', async function () {
    await this.loginEcommerce.comprar();
});

Then('Debería ver un mensaje {string} de confirmación de compra', async function (mensaje) {
    await this.loginEcommerce.mensajeDialog(mensaje);
    await expect(this.page).toHaveURL('/');
    await this.loginEcommerce.logout();
});

/**
 * Escenario de filtrar, ordenar y comprar un producto para un cliente existente
 */
When('Cliente filtra los productos por {string}', async function (categoria) {
    await this.loginEcommerce.filtrar(categoria);
});

When('Cliente ordena los productos por {string}', async function (orden) {
    await this.loginEcommerce.ordenar(orden);
});

/**
 * Escenario inicio de sesion credenciales invalidas
 */

Then('Debería ver un mensaje de error {string}', async function (mensaje) {
    await expect(this.page.locator(errorMessage)).toHaveText(mensaje);
});

/**
 * Escenario iniciar sesión con campos vacios
 */

Then('Debería ver el mensaje requerido {string}', async function (men) {
    const mensaje = await this.page.locator(email_user).evaluate(el => el.validationMessage);
    expect(mensaje).toContain(men);
})

/**
 * Escenario eliminar producto del carrito
 */

When('Cliente elimina el producto del carrito', async function () {
    await this.loginEcommerce.eliminaProductoCarrito();
});

Then('Deberia ver el mensaje de carrito vacio {string}', async function (mensaje) {
    await expect(this.page.locator('body')).toContainText(mensaje);
});


