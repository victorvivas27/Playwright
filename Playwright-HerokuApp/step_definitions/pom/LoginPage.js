const { expect } = require("@playwright/test");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginURL = '/login';
        this.selectors = {
            usernameInput: '#username',
            passwordInput: '#password',
            loginButton: 'button[type="submit"]',
            errorMessage: '.flash.error',
        }

    }
    async fillField(selector, value) {
        await this.page.locator(selector).fill(value);
    }

    async fillUsername(value) {
        await this.fillField(this.selectors.usernameInput, value);
    }

    async fillPassword(value) {
        await this.fillField(this.selectors.passwordInput, value);
    }


    async clickLogin() {
        await this.page.getByRole('button', 'Login').click();
    }

     async checkMessage(expectedText) {
        await expect(this.page.locator(this.selectors.errorMessage)).toContainText(expectedText);
    }
}

module.exports = LoginPage;