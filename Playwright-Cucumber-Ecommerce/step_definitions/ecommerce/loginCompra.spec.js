
import selectores from "../../selector/selectores.js";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
const {
    email_user,
    password_user,
    sign_In,
    add,
    compra,
    carrito,
    logout,
    errorMessage,
    eliminaProductoCarrito,
    allCategory,
    sortBy
} = selectores;

/**
 * Escenario de compra completa para un cliente existente
 */

Given('Cliente existente realiza una compra completa', async function () {
    await this.page.goto('/');
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

Then('debería ver un mensaje {string} de confirmación de compra', async function (mensaje) {
    await this.loginEcommerce.mensajeDialog(mensaje);
    await expect(this.page).toHaveURL('/');
    await this.loginEcommerce.logout();
});

/**
 * Escenario de filtrar, ordenar y comprar un producto para un cliente existente
 */
When('Cliente filtra los productos por {string}', async function (categoria) {
    await this.page.locator(allCategory).selectOption({ label: categoria });
});

When('Cliente ordena los productos por {string}', async function (orden) {
    await this.page.locator(sortBy).selectOption({ label: orden });
});

/**
 * Escenario inicio de sesion credenciales invalidas
 */

Then('debería ver un mensaje de error {string}', async function (mensaje) {
    await expect(this.page.locator(errorMessage)).toHaveText(mensaje);
});

/**
 * Escenario iniciar sesión con campos vacios
 */

Then('debería ver el mensaje requerido {string}', async function (men) {
    const mensaje = await this.page.locator(email_user).evaluate(el => el.validationMessage);
    expect(mensaje).toContain(men);
})

/**
 * Escenario eliminar producto del carrito
 */

When('Cliente elimina el producto del carrito', async function () {
    await this.page.locator(eliminaProductoCarrito).click();
    await expect(this.page.locator('body')).toContainText('Your cart is empty');
});

Then('Deberia ver el mensaje de carrito vacio {string}', async function (mensaje) {
    await expect(this.page.locator('body')).toContainText(mensaje);
});


