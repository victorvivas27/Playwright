

import {test,expect } from "@playwright/test";

const baseUrl = 'https://the-internet.herokuapp.com/login';
const users = {
    validUser: {
        userName: 'tomsmith',
        password: 'SuperSecretPassword!'
    },
    invalidUsers: {
        userName: 'juan',
        password: 'Perez'
    }
}

test.describe('Validar página de login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
    });
test('Datos válidos', async ({ page }) => {
        await page.locator('#username').fill(users.validUser.userName);
        await page.locator('#password').fill(users.validUser.password);
        await page.getByRole('button', { name: "Login" }).click();
        await expect(page).toHaveURL(/.*\/secure/);

    });

    test('Datos invalidos', async ({ page }) => {
        await page.getByLabel('Username').fill(users.invalidUsers.userName);
        await page.getByLabel('Password').fill(users.invalidUsers.password);
        await page.getByRole('button', { name: "Login" }).click();
        await expect(page.locator('.flash.error')).toBeVisible();

    });


    test('Un campo vacio', async ({ page }) => {
        //Seleccionamos los elementos
        await page.getByLabel('Username').fill(users.invalidUsers.userName);
        await page.getByLabel('Password').fill('');
        await page.getByRole('button', { name: "Login" }).click();
        await expect(page.getByText('Your username is invalid!')).toBeVisible();
        //await expect(page.getByText('Your username is invalid!')).toHaveClass('flash error');
        //await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
    });

});