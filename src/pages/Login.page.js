const { BasePage } = require('./Base.page');
const credentials = require('./credentials')
class LoginPage extends BasePage {
    get usernameInput() {
        return $('#user-name');
    }

    get passwordInput() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }

    async performLogin(username=credentials.username, password=credentials.password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };
