import {SignupPage} from '../../pages/auth/signup.po';

describe('SignUp page checks', () => {
  let signUpPage: SignupPage;

  beforeEach(() => {
    signUpPage = new SignupPage();
  });

  beforeEach(() => {
    signUpPage.navigateTo();
  });

  it('should contain a register form', () => {
    expect(signUpPage.hasLoginForm()).toBe(true);
  });

  it('should have no error at the beginning', () => {
    expect(signUpPage.hasFormErrorMessage()).toBe(false);
    expect(signUpPage.hasEmailError()).toBe(false);
    expect(signUpPage.hasPasswordError()).toBe(false);
    expect(signUpPage.hasFirstNameError()).toBe(false);
    expect(signUpPage.hasLastNameError()).toBe(false);
  });

  it('should display errors after touching the required inputs and then leaving them', () => {
    signUpPage.focusEmail();
    signUpPage.focusPassword();
    signUpPage.focusFirstName();
    signUpPage.focusLastName();
    signUpPage.focusEmail();

    expect(signUpPage.hasEmailError()).toBe(true);
    expect(signUpPage.hasPasswordError()).toBe(true);
    expect(signUpPage.hasFirstNameError()).toBe(true);
    expect(signUpPage.hasLastNameError()).toBe(true);
  });

  it('should clear the errors after typing valid data', () => {
    signUpPage.focusEmail();
    signUpPage.focusPassword();
    signUpPage.focusFirstName();
    signUpPage.focusLastName();

    signUpPage.inputEmail('valid@email.me');
    signUpPage.inputPassword('12345678');
    signUpPage.inputFirstName('Fn');
    signUpPage.inputLastName('Ln');

    expect(signUpPage.hasEmailError()).toBe(false);
    expect(signUpPage.hasPasswordError()).toBe(false);
    expect(signUpPage.hasFirstNameError()).toBe(false);
    expect(signUpPage.hasLastNameError()).toBe(false);
  });

  it('should not be able to submit the forms while it has error', () => {
    signUpPage.focusEmail();
    signUpPage.focusPassword();
    signUpPage.focusFirstName();
    signUpPage.focusLastName();
    signUpPage.focusEmail();

    expect(signUpPage.canSubmitForm()).not.toBeNull();
  });

  it('should be able to submit the form with valid data', () => {
    signUpPage.inputEmail('valid@email.me');
    signUpPage.inputPassword('12345678');
    signUpPage.inputFirstName('fn');
    signUpPage.inputLastName('ln');

    expect( signUpPage.canSubmitForm()).toBeNull();
  });
});
