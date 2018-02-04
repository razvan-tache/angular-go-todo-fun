import { TestBed, inject } from '@angular/core/testing';

import { AnonymousGuardService } from './anonymous-guard.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
});
