import {browser, by, element} from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  isOnPage() {
    expect(browser.getCurrentUrl()).toContain('/login');
  }

  hasLoginForm() {
    return element(by.css('[name="loginForm"]')).isPresent();
  }

  hasFormErrorMessage() {
    return element(by.css('.login-form-error')).isPresent();
  }

  getFormErrorMessage() {
    if (this.hasFormErrorMessage()) {
      return element(by.css('.login-form-error')).getInnerHtml();
    }

    return null;
  }

  hasEmailError() {
    return element(by.css('.email-error')).isPresent();
  }

  getEmailError() {
    if (this.hasEmailError()) {
      return element(by.css('.email-error')).getInnerHtml();
    }

    return null;
  }

  hasPasswordError() {
    return element(by.css('.password-error')).isPresent();
  }

  getPasswordError() {
    if (this.hasPasswordError()) {
      element(by.css('.password-error')).getInnerHtml();
    }

    return null;
  }

  focusEmail() {
    element(by.css('[name="email"]')).click();
  }

  focusPassword() {
    element(by.css('[name="password"]')).click();
  }

  inputEmail(email: string) {
    element(by.css('[name="email"]')).sendKeys(email);
  }

  inputPassword(password: string) {
    element(by.css('[name="password"]')).sendKeys(password);
  }

  canSubmitForm() {
    return element(by.css('[type="submit"]')).getAttribute('disabled');
  }

  submitForm() {
    element(by.css('[type="submit"]')).click();
  }
}
