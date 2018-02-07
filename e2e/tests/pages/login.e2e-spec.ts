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

  it('should display errors after touching the required inputs and then leaving them', () => {
    loginPage.focusEmail();
    loginPage.focusPassword();
    loginPage.focusEmail();

    expect(loginPage.hasEmailError()).toBe(true);
    expect(loginPage.hasPasswordError()).toBe(true);
  });

  it('should clear the errors after typing valid data', () => {
    loginPage.focusEmail();
    loginPage.focusPassword();

    loginPage.inputEmail('valid@email.me');
    loginPage.inputPassword('12345678');
  });

  it('should not be able to submit the forms while it has error', () => {
    loginPage.focusEmail();
    loginPage.focusPassword();
    loginPage.focusEmail();

    expect(loginPage.canSubmitForm()).not.toBeNull();
  });

 it('should be able to submit the form with valid data', () => {
   loginPage.inputEmail('valid@email.me');
   loginPage.inputPassword('12345678');

   expect( loginPage.canSubmitForm()).toBeNull();
 });
});
