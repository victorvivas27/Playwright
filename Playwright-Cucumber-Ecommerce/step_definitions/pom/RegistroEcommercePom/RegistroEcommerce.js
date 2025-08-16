import { BasePage } from "../BasePage.js";

export class RegistroEcommerce extends BasePage {
    constructor(page) {
        super(page);

    }

    async inputFullName(fullName) {
        await this.fillField(this.selectores.fullName_user, fullName);
    }

    async inputConfirmPassword(confirm_password) {
        await this.fillField(this.selectores.confirm_password_user, confirm_password);
    }
    async clickCreateAccount() {
        await this.byRole('button', this.selectores.createAccount);
    }
    async registro(fullName, email, password, confirm_password) {
        await this.inputFullName(fullName);
        await this.inputEmail(email);
        await this.inputPassword(password);
        await this.inputConfirmPassword(confirm_password);
        await this.clickCreateAccount();
    }
}