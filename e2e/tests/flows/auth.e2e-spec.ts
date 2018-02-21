import {SignupPage} from '../../pages/auth/signup.po';
import {LoginPage} from '../../pages/auth/login.po';
import {HomePage} from '../../pages/home/app.po';
import {browser} from 'protractor';

import * as Faker from 'faker';
import {async} from '@angular/core/testing';

describe('The auth flows are working', () => {
  const email: string = Faker.internet.email();
  const password: string = Faker.internet.password();
  const firstName = 'some fn';
  const lastName = 'some ln';

  let signUpPage: SignupPage;
  let loginPage: LoginPage;
  let homePage: HomePage;

  beforeEach(() => {
    signUpPage = new SignupPage();
    loginPage = new LoginPage();
    homePage = new HomePage();
  });

  afterEach(async() => {
    browser.get('/logout');
  });

  it('should be able to sign up with a new account', () => {
    signUpPage.navigateTo();

    signUpPage.inputEmail(email);
    signUpPage.inputPassword(password);
    signUpPage.inputFirstName(firstName);
    signUpPage.inputLastName(lastName);

    signUpPage.submitForm();
    expect(homePage.getHomeComponentMessage()).toEqual('home works!');
    browser.get('/logout');
    loginPage.isOnPage();
  });

  it('should give an error when trying to sign up with the same account', () => {
    signUpPage.navigateTo();

    signUpPage.inputEmail(email);
    signUpPage.inputPassword(password);
    signUpPage.inputFirstName(firstName);
    signUpPage.inputLastName(lastName);

    signUpPage.submitForm();
    expect(signUpPage.hasFormErrorMessage()).toBe(true);
  });

  it('should display an error when trying to login with credentials that don\'t exist', () => {
    loginPage.navigateTo();

    loginPage.inputEmail(email + 'a123b');
    loginPage.inputPassword(password);

    loginPage.submitForm();
    expect(loginPage.hasFormErrorMessage()).toBe(true);
  });

  it('should do a login', () => {
    loginPage.navigateTo();

    loginPage.inputEmail(email);
    loginPage.inputPassword(password);

    loginPage.submitForm();

    expect(homePage.getHomeComponentMessage()).toEqual('home works!');
    browser.get('/logout');
    loginPage.isOnPage();
  });

  it('should not be able to access neither login not signup after login', () => {
    loginPage.navigateTo();

    loginPage.inputEmail(email);
    loginPage.inputPassword(password);

    loginPage.submitForm();

    browser.wait(function() {
      return browser.getCurrentUrl().then(function (url) {
        return !(/login/.test(url));
      });
    }).then(function () {
      loginPage.navigateTo();
      homePage.isOnPage();

      signUpPage.navigateTo();
      homePage.isOnPage();
    });
  });
});

