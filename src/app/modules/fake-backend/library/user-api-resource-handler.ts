import {FakeApiResourceHandler} from './fake-api-resource-handler';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';

export class UserApiResourceHandler implements FakeApiResourceHandler {

  canHandleRequest(request: HttpRequest<any>): boolean {
    if (!request.url.endsWith('/api/users')) {
      return false;
    }

    return request.method === 'POST';
  }

  handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.doPost(request, next);
  }

  private doPost(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users'));

    if (isNullOrUndefined(userData => userData.username === request.body.username)) {
      const user = {
        id: Math.random() * 10000,
        username: request.body.username,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        token: 'Fake token',
        expiresIn: 3600
      };

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return Observable.of(new HttpResponse({ status: 200 }));
    }

    return Observable.throw('Username "' + request.body.username + '" is already taken');
  }
}
