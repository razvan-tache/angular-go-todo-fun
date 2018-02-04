import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../modules/core/services/auth/auth.service';
import {LoginRequest} from '../../modules/core/library/auth/login-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginRequest = {email: '', password: ''};
  loginError = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        res => this.router.navigate(['/']),
        error => this.loginError = error
      );
  }
}
