import { Injectable } from '@angular/core';

import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string) {
    return this.httpClient.post<any>('/api/authenticate', {email: email, password: password})
      .do(res => this.setTokenData)
      .shareReplay();
  }

  public logout() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('token');
  }

  public register({email, password, firstName, lastName}) {
    return this.httpClient.post<any>('/api/users', {email: email, password: password, firstName: firstName, lastName: lastName})
      .do(res => this.setTokenData)
      .shareReplay();
  }

  public isLoggedIn(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    return moment().isBefore(moment(expiresAt));
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private setTokenData(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }
}
