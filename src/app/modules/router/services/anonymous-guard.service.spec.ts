import { TestBed, inject } from '@angular/core/testing';

import { AnonymousGuardService } from './anonymous-guard.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

describe('AnonymousGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymousGuardService, AuthService],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
    });
  });

  it('should be created', inject([AnonymousGuardService], (service: AnonymousGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should redirect logged in users to home(/)', inject(
    [AnonymousGuardService, Router, AuthService],
    (service: AnonymousGuardService, router: Router, authService: AuthService) => {

    spyOn(router, 'navigate').and.callFake((components: any[]) => {
      expect(components.pop()).toBe('/');
    });

    spyOn(authService, 'isLoggedOut').and.callFake(() => false);
    const routerStateMock = createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
    expect(service.canActivate(new ActivatedRouteSnapshot(), routerStateMock)).toBeFalsy();
  }));

  it('should allow guest users on the page', inject(
    [AnonymousGuardService, AuthService],
    (service: AnonymousGuardService, authService: AuthService) => {

      spyOn(authService, 'isLoggedOut').and.callFake(() => true);

      const routerStateMock = createSpyObj<RouterStateSnapshot>('RouterStateSnapshop', ['toString']);
      expect(service.canActivate(new ActivatedRouteSnapshot(), routerStateMock)).toBeTruthy();
    }
  ));
});
