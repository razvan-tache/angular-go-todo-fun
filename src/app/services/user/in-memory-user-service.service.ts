import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryUserServiceService extends InMemoryDbService {
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    let users = [
      { id: 1, name: 'Razvan Tache', email: 'razvan.tache@email.com', username: 'rtache', password: '12345' }
    ];

    return {users};
}
