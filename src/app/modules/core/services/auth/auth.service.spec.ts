import {TestBed, inject, getTestBed} from '@angular/core/testing';

import { AuthService } from './auth.service';

import moment = require('moment');
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AuthService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    httpMock = getTestBed().get(HttpTestingController);
  });

  beforeEach( () => {
    const store = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string> value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should have user token expired', inject([AuthService], (service: AuthService) => {
    localStorage.setItem(AuthService.EXPIRES_AT_KEY, JSON.stringify(moment().subtract(20, 'second')));

    expect(service.isLoggedIn()).toBeFalsy();
    expect(service.isLoggedOut()).toBeTruthy();
  }));

  it('should not have a user logged in', inject([AuthService], (service: AuthService) => {
    expect(service.isLoggedIn()).toBeFalsy();
    expect(service.isLoggedOut()).toBeTruthy();
  }));

  it('should have user logged in', inject([AuthService], (service: AuthService) => {
    localStorage.setItem(AuthService.EXPIRES_AT_KEY, JSON.stringify(moment().add(20, 'second')));

    expect(service.isLoggedIn()).toBeTruthy();
    expect(service.isLoggedOut()).toBeFalsy();
  }));

  it('should register and login a new user', inject([AuthService], (service: AuthService) => {
    const response = {
      token: 'my_key',
      expiresIn: 20
    };

    service.register({email: 'razvan@r.com', password: 'myPass', lastName: 'last name', firstName: 'first name'})
      .subscribe((res) => {
        expect(res).toEqual(response);

        expect(service.isLoggedIn()).toBeTruthy();
      });
    const req = httpMock.expectOne(AuthService.REGISTER_URL);
    expect(req.request.method).toBe('POST');

    req.flush(response);
  }));

  it('should fail register for existing username', inject([AuthService], (service: AuthService) => {
    service.register({email: 'razvan@r.com', password: 'myPass', lastName: 'last name', firstName: 'first name'})
      .subscribe(
        () => {},
        error => {
          expect(error.statusText).toEqual('Email already exists');
          expect(service.isLoggedIn()).toBeFalsy();
        });
    const req = httpMock.expectOne(AuthService.REGISTER_URL);
    req.error(new ErrorEvent('INVALID_USERNAME'), {status: 400, statusText: 'Email already exists'});
  }));

  it('should login user', inject([AuthService], (service: AuthService) => {
    const response = {
      token: 'my_key',
      expiresIn: 20
    };

    service.login({email: 'razvan@a.com', password: 'myPass'})
      .subscribe(
        res => {
          expect(res).toEqual(response);

          expect(service.isLoggedIn()).toBeTruthy();
        }
      );

    const req = httpMock.expectOne(AuthService.LOGIN_URL);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  }));

  it('should fail to login user', inject([AuthService], (service: AuthService) => {
    service.login({email: 'razvan@a.com', password: 'myPass'})
      .subscribe(
        () => {},
        error => {
          expect(error.statusText).toBe('Invalid username or password');

          expect(service.isLoggedIn()).toBeFalsy();
        }
      );

    const req = httpMock.expectOne(AuthService.LOGIN_URL);
    req.error(new ErrorEvent('INVALID'), {status: 400, statusText: 'Invalid username or password'});
  }));

  it('should log out the user', inject([AuthService], (service: AuthService) => {
    localStorage.setItem(AuthService.TOKEN_KEY, 'custom_token');
    localStorage.setItem(AuthService.EXPIRES_AT_KEY, JSON.stringify(moment().add(20, 'second')));

    service.logout();

    expect(service.isLoggedIn()).toBeFalsy();
    expect(service.isLoggedOut()).toBeTruthy();
  }));
});
