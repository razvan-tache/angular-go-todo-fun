import {LoginPage} from '../../pages/auth/login.po';
import {log} from 'util';

describe('Login page checks', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  beforeEach(() => {
    loginPage.navigateTo();
  });

  it('should contain a login form', () => {
    expect(loginPage.hasLoginForm()).toBe(true);
  });

  it('should have no error at the beginning', () => {
    expect(loginPage.hasFormErrorMessage()).toBe(false);
    expect(loginPage.hasEmailError()).toBe(false);
    expect(loginPage.hasPasswordError()).toBe(false);
  });

  it('should display errors after touching the inputs and then leaving them', () => {
    loginPage.focusEmail();
    loginPage.focusPassword();
    loginPage.focusEmail();

    expect(loginPage.hasEmailError()).toBe(true);
    expect(loginPage.hasPasswordError()).toBe(true);
  });
});
