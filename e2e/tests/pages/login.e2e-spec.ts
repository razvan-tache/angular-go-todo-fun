import {LoginPage} from '../../pages/auth/login.po';

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

  // it('should have an ')
});
