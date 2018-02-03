import {FakeApiResourceHandler} from './fake-api-resource-handler';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {isNullOrUndefined} from 'util';

export class AuthApiResourceHandler implements FakeApiResourceHandler {

  canHandleRequest(request: HttpRequest<any>): boolean {
    return request.url.endsWith('/api/authenticate');
  }

  handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];

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
}
