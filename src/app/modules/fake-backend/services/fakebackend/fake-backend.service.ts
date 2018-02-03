import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/delay';
import {FakeApiResourceHandler} from '../../library/fake-api-resource-handler';
import {AuthApiResourceHandler} from '../../library/auth-api-resource-handler';
import {UserApiResourceHandler} from '../../library/user-api-resource-handler';

@Injectable()
export class FakeBackendService implements HttpInterceptor {
  private apiResourcesHandler: FakeApiResourceHandler[] = [];

  constructor() {
    this.apiResourcesHandler.push(new AuthApiResourceHandler());
    this.apiResourcesHandler.push(new UserApiResourceHandler());
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.of(null).mergeMap(() => {

      for (const apiHandler of this.apiResourcesHandler) {
        if (apiHandler.canHandleRequest(request)) {
          const response = apiHandler.handleRequest(request, next);

          if (null !== response) {
            return response;
          }
        }
      }

      return next.handle(request);
    })
      .materialize()
      .delay(500)
      .dematerialize();
  }
}
