import {browser, by, element} from 'protractor';
import {LoginPage} from './login.po';

export class SignupPage extends LoginPage {
  navigateTo() {
    return browser.get('/sign-up');
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

  hasLastNameError() {
    return element(by.css('.lastName-error')).isPresent();
  }

  hasFirstNameError() {
    return element(by.css('.firstName-error')).isPresent();
  }

  focusFirstName() {
    element(by.css('[name="firstName"]')).click();
  }

  focusLastName() {
    element(by.css('[name="lastName"]')).click();
  }

  inputFirstName(firstName: string) {
    element(by.css('[name="firstName"]')).sendKeys(firstName);
  }

  inputLastName(lastName: string) {
    element(by.css('[name="lastName"]')).sendKeys(lastName);
  }
}
