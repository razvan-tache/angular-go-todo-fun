import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../../components/home/home.component';
import { SignUpComponent } from '../../../components/sign-up/sign-up.component';
import {AuthService} from '../../core/services/auth/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent }
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
    AuthService
  ],
  declarations: []
})
export class AppRouterModule { }
