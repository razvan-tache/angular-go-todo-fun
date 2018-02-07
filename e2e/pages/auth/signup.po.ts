import {browser, by, element} from 'protractor';
import {LoginPage} from './login.po';

export class SignupPage extends LoginPage {
  navigateTo() {
    browser.get('/sign-up');
  }

  isOnPage() {
    expect(browser.getCurrentUrl()).toContain('/sign-up');
  }

  hasLoginForm() {
    return element(by.css('[name="registerForm"]')).isPresent();
  }

  hasFormErrorMessage() {
    return element(by.css('.register-form-error')).isPresent();
  }

  getFormErrorMessage() {
    if (this.hasFormErrorMessage()) {
      return element(by.css('.register-form-error')).getInnerHtml();
    }

    return null;
  }
}
