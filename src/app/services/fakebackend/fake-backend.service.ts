import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/delay';

@Injectable()
export class FakeBackendService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('asd');
    console.log('request', request);
    // let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return Observable.of(null).mergeMap(() => {
    console.log('some');
      if (request.url.endsWith('/api/authenticate')) {
        return Observable.of(new HttpResponse({status: 200, body: {'message': 'hello'}}));
      }

      return next.handle(request);
    })
      .materialize()
      .delay(500)
      .dematerialize();
  }
}
