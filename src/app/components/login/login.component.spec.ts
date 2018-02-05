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
      emailEl.nativeElement.value = 'razvan@razvan.razvan';
      emailEl.nativeElement.dispatchEvent(new Event('input'));

      passwordEl.nativeElement.value = '12345678';
      passwordEl.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(formEl.nativeElement.checkValidity()).toBe(true);
      expect(buttonEl.nativeElement.disabled).toBe(false);
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

  //TODO: test invalid emails:
  //TODO: test small passwords:
  //TODO: 
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
