import {FakeApiResourceHandler} from './fake-api-resource-handler';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

export class AuthApiResourceHandler implements FakeApiResourceHandler {

  canHandleRequest(request: HttpRequest<any>): boolean {
    return request.url.endsWith('/api/authenticate');
  }

  handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    const email = request.body.email;
    const password = request.body.password;

    const user = users.find(userData => userData.email === email && userData.password === password);

    if (!isNullOrUndefined(user)) {
      const body = {
        id: user.id,
        email: user.email,
        fistName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token',
        expiresIn: 3600
      };

      return Observable.of(new HttpResponse({status: 200, body: body}));
    }

    return Observable.throw('Incorrect username or password');
  }
}
