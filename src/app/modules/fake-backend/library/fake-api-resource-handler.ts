import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface FakeApiResourceHandler {
  canHandleRequest(request: HttpRequest<any>): boolean;
  handleRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
