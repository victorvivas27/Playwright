import test, { expect } from "@playwright/test";
import { only } from "node:test";

const baseUrl = 'https://ecommerce-js-test.vercel.app/'

const user = {

    login: {
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User'
    },
    loginInvalido: {
        email: 'victor@example.com',
        password: 'victor123',
        mensaje: 'Invalid email or password'
    },
    registro: {
        fullName: 'Victor Vivas',
        email: 'nuevo@example.com',
        password: 'nuevo123',
        confirmPassword: 'nuevo123',

    },
    registroErrorPassword: {
        password: 'ers12',
        error: 'Password must be at least 6 characters long'
    }

}

const login = {
    async loginUser(page) {
        await page.getByRole('link', { name: 'Login' }).click();
        await page.locator('#email').fill(user.login.email);
        await page.locator('#password').fill(user.login.password);
        await page.locator('.absolute').click();
        await page.locator('button.w-full').click();
    }
}

const registro = {
    async registerUser(page) {
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('#name').fill(user.registro.fullName);
        await page.locator('#email').fill(user.registro.email);
        await page.locator('#password').fill(user.registro.password);
        await page.locator('#confirmPassword').fill(user.registro.confirmPassword);
        await page.locator('button.w-full').click();
    }
}

test.describe("E-commerce Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
    });
    test('1. Login valido ,verificar mensaje de bienvenida usuario', async ({ page }) => {
        await login.loginUser(page);
        await expect(page.locator('span.font-medium')).toHaveText(`Hello, ${user.login.name}`);
    })
    test('2. Login invalido ,verificar mensaje de error', async ({ page }) => {
        await page.getByRole('link', { name: 'Login' }).click();
        await page.locator('#email').fill(user.loginInvalido.email);
        await page.locator('#password').fill(user.loginInvalido.password);
        await page.locator('.absolute').click();
        await page.locator('button.w-full').click();
        await expect(page.locator('.text-red-800')).toHaveText(user.loginInvalido.mensaje);
    })
    test('3. Registro valido ,verificar mensaje de bienvenida usuario', async ({ page }) => {
        await registro.registerUser(page);
        await expect(page.locator('span.font-medium')).toHaveText(`Hello, ${user.registro.fullName}`);
    })

    test('4. Registro invalido ,verificar que password >= 5', async ({ page }) => {
        await page.getByRole('link', { name: 'Register' }).click();
        await page.locator('#name').fill(user.registro.fullName);
        await page.locator('#email').fill(user.registro.email);
        await page.locator('#password').fill(user.registroErrorPassword.password);
        await page.locator('#confirmPassword').fill(user.registroErrorPassword.password);
        await page.locator('button.w-full').click();
        await expect(page.locator('.text-red-800')).toHaveText(user.registroErrorPassword.error);
    })
    test('5. Compra autenticada - validar mensaje de confirmación', async ({ page }) => {
        await login.loginUser(page);
        const card = page.locator('.product-card', { hasText: 'Mens Casual Slim Fit' })
        await card.getByRole('button', { name: 'Add' }).click();
        await page.locator('a[href="/cart"]').click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
        await page.on('dialog', async dialog => {
            //expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('Thank you for your purchase!');
            await dialog.accept();
        });
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.url()).toBe(baseUrl);
    })
    test('5. Compra autenticada - cancelar compra validar carrito vacio', async ({ page }) => {
        await login.loginUser(page);
        const card = page.locator('.product-card', { hasText: 'Mens Casual Slim Fit' })
        await card.getByRole('button', { name: 'Add' }).click();
        await page.locator('a[href="/cart"]').click();
        await page.locator('button.text-red-600:nth-child(2)').click();
        await expect(page.locator('body')).toContainText('Your cart is empty');
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.url()).toBe(baseUrl);

    })
    test('6. Registrarse - agregar 5 productos al carrito validar compra', async ({ page }) => {
        await registro.registerUser(page);
        await page.locator('.product-card', { hasText: 'Solid Gold Petite Micropave' }).click();
        await page.locator('.lucide-plus').click({ clickCount: 4 });
       /*  for (let i = 0; i < 4; i++){
            await agregarProductos.click();
        } */
        await page.getByRole('button', { name: 'Add to cart' }).click();
        await expect( page.locator('span.absolute')).toHaveText('5');
        await page.locator('a[href="/cart"]').click();
        await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
        await page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Thank you for your purchase!');
            await dialog.accept();
        });
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.url()).toBe(baseUrl);
    })
});
