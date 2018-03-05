import { Component } from '@angular/core';
import {RegisterRequest} from '../../modules/core/library/auth/register-request';
import {AuthService} from '../../modules/core/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  model: RegisterRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };
  registerError = '';

  constructor(private authService: AuthService, private router: Router) { }

  public register() {
    this.registerError = '';
    this.authService.register(this.model)
      .subscribe(
        () => this.router.navigate(['/']),
        error => this.registerError = error
      );
  }
}
