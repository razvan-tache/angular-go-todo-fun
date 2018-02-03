import { Injectable } from '@angular/core';

import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
import {RegisterRequest} from '../../library/auth/register-request';
import {LoginRequest} from '../../library/auth/login-request';

@Injectable()
export class AuthService {
  public static EXPIRES_AT_KEY = 'expires_at';
  public static TOKEN_KEY = 'token';

  public static REGISTER_URL = '/api/users';
  public static LOGIN_URL = '/api/authenticate';

  constructor(private httpClient: HttpClient) { }

  public login(loginRequestEntity: LoginRequest) {
    return this.httpClient.post<any>(AuthService.LOGIN_URL, loginRequestEntity)
      .do(res => this.setTokenData(res))
      .shareReplay();
  }

  public logout() {
    localStorage.removeItem(AuthService.EXPIRES_AT_KEY);
    localStorage.removeItem(AuthService.TOKEN_KEY);
  }

  public register(userRequestEntity: RegisterRequest) {
    return this.httpClient.post<any>(AuthService.REGISTER_URL, userRequestEntity)
      .do(res => this.setTokenData(res))
      .shareReplay();
  }

  public isLoggedIn(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem(AuthService.EXPIRES_AT_KEY));

    return moment().isBefore(moment(expiresAt));
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private setTokenData(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem(AuthService.TOKEN_KEY, authResult.token);
    localStorage.setItem(AuthService.EXPIRES_AT_KEY, JSON.stringify(expiresAt));
  }
}
