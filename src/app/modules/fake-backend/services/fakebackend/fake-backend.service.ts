import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/delay';
import {isNullOrUndefined} from 'util';

@Injectable()
export class FakeBackendService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('asd');
    console.log('request', request);

    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return Observable.of(null).mergeMap(() => {
      if (request.url.endsWith('/api/authenticate')) {
        const username = request.body.username;
        const password = request.body.password;

        const user = users.find(userData => userData.username === username && userData.password === password);

        if (!isNullOrUndefined(user)) {
          const body = {
            id: user.id,
            username: user.username,
            fistName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
          };

          return Observable.of(new HttpResponse({status: 200, body: body}));
        }

        return Observable.throw('Incorrect username or password');
      }

      if (request.url.endsWith('/api/users') && request.method === 'POST') {
        if (isNullOrUndefined(userData => userData.username === request.body.username)) {
          const user = {
            id: Math.random() * 10000,
            username: request.body.username,
            password: request.body.password,
            firstName: request.body.firstName,
            lastName: request.body.lastName
          };

          users.push(user);
          localStorage.setItem('users', JSON.stringify(users));

          return Observable.of(new HttpResponse({ status: 200 }));
        }

        return Observable.throw('Username "' + request.body.username + '" is already taken');
      }

      return next.handle(request);
    })
      .materialize()
      .delay(500)
      .dematerialize();
  }
}
