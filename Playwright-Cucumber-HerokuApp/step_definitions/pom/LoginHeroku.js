import { BasePage } from "../pom/BasePage.js";

class LoginHeroku  extends BasePage {
    constructor(page) {
        super(page);
        this.selectores = {
            inputUsername: '#username',
            inputPassword: '#password',
            buttonLoginName: 'Login', 
            flash: '#flash'
        };
        this.loginUrl = '/login';
    }

    async gotoLogin() {
        await this.page.goto(this.loginUrl);
    }

  

    async fillUsername(username) {
        await this.fillField(this.selectores.inputUsername, username);
    }

    async fillPassword(password) {
        await this.fillField(this.selectores.inputPassword, password);
    }

    async clickLogin() {
        await this.byRole('button',this.selectores.buttonLoginName);
    }

    getMessage() {
        return this.page.locator(this.selectores.flash);
    }
}
export default LoginHeroku;