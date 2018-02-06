import {async, ComponentFixture, getTestBed, inject, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {Form, FormControlDirective, FormsModule} from '@angular/forms';
import {AuthService} from '../../modules/core/services/auth/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {LoginRequest} from '../../modules/core/library/auth/login-request';
import {Observable} from 'rxjs/Observable';
import {HttpResponse} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let emailEl: DebugElement;
  let passwordEl: DebugElement;
  let buttonEl: DebugElement;
  let formEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    emailEl = fixture.debugElement.query(By.css('[name="email"]'));
    passwordEl = fixture.debugElement.query(By.css('[name="password"]'));
    buttonEl = fixture.debugElement.query(By.css('[type="submit"]'));
    formEl = fixture.debugElement.query(By.css('[name="loginForm"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form invalid when empty', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(formEl.nativeElement.checkValidity()).toBe(false);
      expect(buttonEl.nativeElement.disabled).toBe(true);
    });
  }));

  it('should have the form valid when having valid data', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const users = [
        {email: 'razvan@razvan.razvan', password: '12345678'},
        {email: 'razvan.razvan.razvan@razvan.razvan', password: '12345678'},
        {email: 'razvan-razvan.razvan@razvan.razvan', password: '12345678'},
        {email: 'razvan.-razvan.asd@razvan.r', password: '12345678'}
      ];
      for (const user of users) {
        emailEl.nativeElement.value = user.email;
        emailEl.nativeElement.dispatchEvent(new Event('input'));

        passwordEl.nativeElement.value = user.password;
        passwordEl.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(formEl.nativeElement.checkValidity()).toBe(true);
        expect(buttonEl.nativeElement.disabled).toBe(false);
      }
    });
  }));

  it('should fail if an invalid email is provided', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const users = [
        {email: 'razvan', password: '12345678'},
        {email: '@razvan.razvan', password: '12345678'},
      ];

      for (const user of users) {
        emailEl.nativeElement.value = user.email;
        emailEl.nativeElement.dispatchEvent(new Event('input'));

        passwordEl.nativeElement.value = user.password;
        passwordEl.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        expect(formEl.nativeElement.checkValidity()).toBe(false);
        expect(buttonEl.nativeElement.disabled).toBe(true);

        expect(fixture.debugElement.query(By.css('.email-error'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.email-error')).nativeElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.email-error')).nativeElement.innerHTML).toContain('Invalid email');
      }
    });
  }));

  it('should fail when an invalid password is provided', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const users = [
        {email: 'razvan@raz.r', password: '1234'}
      ];

      for (const user of users) {
        emailEl.nativeElement.value = user.email;
        emailEl.nativeElement.dispatchEvent(new Event('input'));

        passwordEl.nativeElement.value = user.password;
        passwordEl.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(buttonEl.nativeElement.disabled).toBe(true);
        expect(formEl.nativeElement.checkValidity()).toBe(false);

        expect(fixture.debugElement.query(By.css('.password-error'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.password-error')).nativeElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.password-error')).nativeElement.innerHTML).toContain(
          'Password must contain at least 8 chars'
        );
      }
    });
  }));

  it('should do redirect on login with proper credentials', inject(
    [AuthService, Router], (authService: AuthService, router: Router) => {

      const credentials: LoginRequest = {
        'email': 'asd@asd.com',
        'password': '123'
      };

      spyOn(authService, 'login').and.callFake((model: LoginRequest) => {
        return Observable.of(new HttpResponse({status: 200, body: model}));
      });

      spyOn(router, 'navigate').and.callFake(
        (components: any[]) => { expect(components.pop()).toBe('/'); }
      );

      component.model = credentials;
      component.login();
      expect(component.loginError).toBe('');
    }
  ));

  it('should display the error message it receives when log in fails', inject(
    [AuthService, Router], (authService: AuthService, router: Router) => {
      spyOn(authService, 'login').and.callFake((model: LoginRequest) => {
        return Observable.throw('Incorrect username or password');
      });

      component.login();
      expect(component.loginError).toBe('Incorrect username or password');
    }
  ));
});
