import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../modules/core/services/auth/auth.service';
import {HttpResponse} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {RegisterRequest} from '../../modules/core/library/auth/register-request';
import {Observable} from 'rxjs/Observable';

import * as UsingDataProvider from 'jasmine-data-provider';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {LayoutModule} from '@angular/cdk/layout';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let emailEl: DebugElement;
  let firstNameEl: DebugElement;
  let lastNameEl: DebugElement;
  let passwordEl: DebugElement;
  let buttonEl: DebugElement;
  let formEl: NgForm;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule, CommonModule, AppMaterialModule, LayoutModule ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    emailEl = fixture.debugElement.query(By.css('[name="email"]'));
    firstNameEl = fixture.debugElement.query(By.css('[name="firstName"]'));
    lastNameEl = fixture.debugElement.query(By.css('[name="lastName"]'));
    passwordEl = fixture.debugElement.query(By.css('[name="password"]'));
    buttonEl = fixture.debugElement.query(By.css('[type="submit"]'));
    formEl = fixture.debugElement.query(By.css('[name="registerForm"]')).children[0].injector.get(NgForm);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // MARK: Component interaction with external services.
  it('should redirect the user on successful login', inject(
    [AuthService, Router], (authService: AuthService, router: Router) => {

      const formData: RegisterRequest = {
        email: 'razvan@razvan.com',
        firstName: 'razvan',
        lastName: 'razvan',
        password: '12345678'
      };

      spyOn(authService, 'register').and.callFake((model: RegisterRequest) => {
        return Observable.of(new HttpResponse({status: 200, body: model}));
      });

      spyOn(router, 'navigate');

      component.model = formData;
      component.register();

      expect(component.registerError).toBe('');
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      expect(authService.register).toHaveBeenCalledWith(formData);
    }
  ));

  it('should do register when the form is submitted with no validation errors', async(() => {
    const signUpData = {
      email: 'r@r.com',
      firstName: 'Razvan',
      lastName: 'razvan',
      password: '12345678'
    };

    spyOn(component, 'register');

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      emailEl.nativeElement.value = signUpData.email;
      emailEl.nativeElement.dispatchEvent(new Event('input'));

      firstNameEl.nativeElement.value = signUpData.firstName;
      firstNameEl.nativeElement.dispatchEvent(new Event('input'));

      lastNameEl.nativeElement.value = signUpData.lastName;
      lastNameEl.nativeElement.dispatchEvent(new Event('input'));

      passwordEl.nativeElement.value = signUpData.password;
      passwordEl.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        buttonEl.nativeElement.click();

        expect(component.register).toHaveBeenCalled();
        expect(component.model).toEqual(signUpData);
      });
    });
  }));

  it('should store the error message it receives on error', inject([AuthService], ((authService: AuthService) => {
    spyOn(authService, 'register').and.callFake(() => {
      return Observable.throw('Email already used by another user');
    });

    component.register();

    expect(component.registerError).toBe('Email already used by another user');
  })));

  // MARK: UI Logic tests
  it('should not display the error if it not exists', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.register-form-error')) === null).toBe(true);
    });
  }));

  it('should display the error if it exists', async(() => {
    component.registerError = 'Error happened';

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('.register-form-error')).nativeElement.innerHTML).toContain('Error happened');
    });
  }));

  it('should remove the previous error message while trying a new request', async(inject(
    [AuthService, Router], (authService: AuthService, router: Router) => {

      spyOn(authService, 'register').and.callFake((model: RegisterRequest) => {
        return Observable.of(new HttpResponse({status: 200, body: model}));
      });

      spyOn(router, 'navigate');

      component.registerError = 'Error happened';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.register();

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('.register-form-error')) === null).toBe(true);
        });
      });
    })
  ));

  it('should have the form valid when it is properly filled in', async() => {
    const signUpData = {
      email: 'r@r.com',
      firstName: 'Razvan',
      lastName: 'razvan',
      password: '12345678'
    };

    fixture.whenStable().then(() => {
      emailEl.nativeElement.value = signUpData.email;
      emailEl.nativeElement.dispatchEvent(new Event('input'));

      firstNameEl.nativeElement.value = signUpData.firstName;
      firstNameEl.nativeElement.dispatchEvent(new Event('input'));

      lastNameEl.nativeElement.value = signUpData.lastName;
      lastNameEl.nativeElement.dispatchEvent(new Event('input'));

      passwordEl.nativeElement.value = signUpData.password;
      passwordEl.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(formEl.valid).toBe(true);
        expect(buttonEl.nativeElement.disabled).toBe(false);
      });
    });
  });

  it('should have the form invalid when there is no data', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(formEl.valid).toBe(false);
      expect(buttonEl.nativeElement.disabled).toBe(true);
    });
  }));

  UsingDataProvider(getInvalidFieldsTestData, (data, description) => {
    it(description, async(() => {
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        emailEl.nativeElement.value = data.user.email;
        emailEl.nativeElement.dispatchEvent(new Event('input'));
        emailEl.nativeElement.dispatchEvent(new Event('blur'));

        firstNameEl.nativeElement.value = data.user.firstName;
        firstNameEl.nativeElement.dispatchEvent(new Event('input'));
        firstNameEl.nativeElement.dispatchEvent(new Event('blur'));

        lastNameEl.nativeElement.value = data.user.lastName;
        lastNameEl.nativeElement.dispatchEvent(new Event('input'));
        lastNameEl.nativeElement.dispatchEvent(new Event('blur'));

        passwordEl.nativeElement.value = data.user.password;
        passwordEl.nativeElement.dispatchEvent(new Event('input'));
        passwordEl.nativeElement.dispatchEvent(new Event('blur'));

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(buttonEl.nativeElement.disabled).toBe(true);
          expect(formEl.valid).toBe(false);

          expect(fixture.debugElement.query(By.css(data.errorElement))).toBeTruthy();
          expect(fixture.debugElement.query(By.css(data.errorElement)).nativeElement).toBeTruthy();
          expect(fixture.debugElement.query(By.css(data.errorElement)).nativeElement.innerHTML).toContain(data.message);
        });
      });
    }));
  });

  function getInvalidFieldsTestData() {
    return {
      'should fail email validation: 1':
        {
          user: {email: 'razvan', firstName: 'fn', lastName: 'ln', password: '12345678'},
          errorElement: '.email-error',
          message: 'Invalid email'
        },
      'should fail email validation: 2':
        {
          user: {email: '@razvan.r', firstName: 'fn', lastName: 'ln', password: '12345678'},
          errorElement: '.email-error',
          message: 'Invalid email'
        },
      'should fail email is mandatory':
        {
          user: {email: '', firstName: 'fn', lastName: 'ln', password: '12345678'},
          errorElement: '.email-error',
          message: 'Invalid email'
        },
      'should fail password too short validation':
        {
          user: {email: 'r@razvan.r', firstName: 'fn', lastName: 'ln', password: '1234'},
          errorElement: '.password-error',
          message: 'Password must contain at least 8 characters.'
        },
      'should fail password is mandatory':
        {
          user: {email: 'r@razvan.r', firstName: 'fn', lastName: 'ln', password: ''},
          errorElement: '.password-error',
          message: 'Password must contain at least 8 characters.'
        },
      'should fail first name is mandatory':
        {
          user: {email: 'r@razvan.r', firstName: '', lastName: 'ln', password: '1234'},
          errorElement: '.firstName-error',
          message: 'First name is mandatory'
        },
      'should fail last name is mandatory':
        {
          user: {email: 'r@razvan.r', firstName: 'fn', lastName: '', password: '1234'},
          errorElement: '.lastName-error',
          message: 'Last name is mandatory'
        }
    };
  }
});
