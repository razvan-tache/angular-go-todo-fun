import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import {AuthService} from '../../modules/core/services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should log out the user and redirect it home', inject(
    [AuthService, Router],
    (authService: AuthService, router: Router) => {
      spyOn(authService, 'logout');
      spyOn(router, 'navigate');

      fixture.detectChanges();
      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }
  ));
});
