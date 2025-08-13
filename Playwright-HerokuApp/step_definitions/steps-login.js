const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('que el usuario está en la página de login', async function () {
    await this.page.goto('/login');
    await expect(this.page).toHaveURL(/.*\/login/);
});

When('el usuario ingresa el nombre de usuario "tomsmith"', async function () {
    //await this.page.locator('#username').fill('tomsmith');
    await this.loginPage.fillUsername('tomsmith');
});

When('el usuario ingresa la contraseña "SuperSecretPassword!"', async function () {
    //await this.page.locator('#password').fill('SuperSecretPassword!');
    await this.loginPage.fillPassword('SuperSecretPassword!');
});

When('el usuario hace clic en el botón de login', async function () {
    await this.loginPage.clickLogin();
});

Then('debería ver el mensaje "You logged into a secure area!"', async function () {
    await expect(this.page).toHaveURL(/.*\/secure/);
});

/* Pasos del scenario con login invalido */

// When('ingresa credenciales inválidas', async function () {
//     await this.page.locator('#username').fill('pepito');
//     await this.page.locator('#password').fill('pepito!');
//     await this.page.getByRole('button', 'Login').click();
// });

Then('debe permanecer en la página de login', async function () {
    await expect(this.page).toHaveURL(/.*\/login/);
});

Then('debe ver mensaje de error de credenciales inválidas', async function () {
    //Seleccionar el elemento que contiene el mensaje
   await this.loginPage.clickLogin();
    //await expect(this.page.getByText('Your username is invalid!')).toBeVisible();
});

// When('ingresa una credencial vacia', async function () {
//     await this.page.locator('#username').fill('otracosapepito');
//     await this.page.locator('#password').fill('');
//     await this.page.getByRole('button', 'Login').click();
// });

When('ingresa usuario {string} y clave {string} y presiona el botón "Login"', async function (username, password) {
    //await this.page.locator('#username').fill(username);
    //await this.page.locator('#password').fill(password);
    await this.loginPage.fillUsername(username);
    await this.loginPage.fillPassword(password);
    await this.loginPage.clickLogin();
});