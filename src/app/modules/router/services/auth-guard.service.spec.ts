import {TestBed, inject} from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService, AuthService],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should redirect the user to login when not logged in', inject(
    [AuthGuardService, Router], (service: AuthGuardService, router: Router) => {
      spyOn(router, 'navigate').and.callFake((components: any[]) => {
        expect(components.pop()).toBe('/login');
      });

      const routerStateMock = createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
      expect(service.canActivate(new ActivatedRouteSnapshot(), routerStateMock)).toBeFalsy();
  }));

  it('should allow the the user on the route when logged in', inject(
    [AuthGuardService, AuthService], (service: AuthGuardService, authService: AuthService) => {
      spyOn(authService, 'isLoggedIn').and.callFake(() => true);

      const routerStateMock = createSpyObj<RouterStateSnapshot>('RouterStateSnapshop', ['toString']);
      expect(service.canActivate(new ActivatedRouteSnapshot(), routerStateMock)).toBeTruthy();
    }));
});
