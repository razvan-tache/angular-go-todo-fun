import { Component } from '@angular/core';
import {AuthService} from '../../modules/core/services/auth/auth.service';
import {LoginRequest} from '../../modules/core/library/auth/login-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest = {email: '', password: ''};
  loginError = '';
  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.loginError = '';
    this.authService.login(this.model)
      .subscribe(
        () => this.router.navigate(['/']),
        error => this.loginError = error
      );
  }
}
