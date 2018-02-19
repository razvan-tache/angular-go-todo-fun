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
import {LoggedInLayoutComponent} from '../../components/logged-in-layout/logged-in-layout.component';
import {GuestLayoutComponent} from '../../components/guest-layout/guest-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedInLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuardService],
        children: [
          { path: '', component: HomeComponent },
          { path: 'logout', component: LogoutComponent }
        ]
      }
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    canActivate: [AnonymousGuardService],
    children: [
      {// TODO: Test the redirect properly: You should not be able to access these routes
        path: '',
        canActivateChild: [AnonymousGuardService],
        children: [
          { path: 'sign-up', component: SignUpComponent },
          { path: 'login', component: LoginComponent }
        ]
      }
    ]
  }
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
