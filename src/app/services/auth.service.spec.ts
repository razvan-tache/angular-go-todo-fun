import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FakeBackendService} from './fakebackend/fake-backend.service';
import moment = require('moment');

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FakeBackendService,
          multi: true
        }
      ]
    });
  });

  beforeEach( () => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string): string => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string> value;
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should not have a user logged in', inject([AuthService], (service: AuthService) => {
    // localStorage.setItem('expires_at', JSON.stringify(moment().add(20, 'second')));
    expect(service.isLoggedIn()).toBe(false);
  }));
});
