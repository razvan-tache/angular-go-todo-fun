import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import {AuthService} from '../core/services/auth/auth.service';
import {LoginComponent} from '../../components/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {LogoutComponent} from '../../components/logout/logout.component';
import {AnonymousGuardService} from './services/anonymous-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [AnonymousGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AnonymousGuardService
  ],
  declarations: []
})
export class AppRouterModule { }
