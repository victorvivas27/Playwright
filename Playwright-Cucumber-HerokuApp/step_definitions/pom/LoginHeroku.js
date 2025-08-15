
class LoginHeroku {
    constructor(page) {
        this.page = page;
        this.selectores = {
            inputUsername: '#username',
            inputPassword: '#password',
            buttonLoginName: 'Login', // nombre visible del botón
            flash: '#flash'
        };
        this.loginUrl = '/login';
    }

    async gotoLogin() {
        await this.page.goto(this.loginUrl);
    }

    async fillField(selector, valor) {
        await this.page.locator(selector).fill(valor);
    }

    async fillUsername(username) {
        await this.fillField(this.selectores.inputUsername, username);
    }

    async fillPassword(password) {
        await this.fillField(this.selectores.inputPassword, password);
    }

    async clickLogin() {
        await this.page.getByRole('button', { name: this.selectores.buttonLoginName }).click();
    }

    getMessage() {
        return this.page.locator(this.selectores.flash);
    }
}
export default LoginHeroku;