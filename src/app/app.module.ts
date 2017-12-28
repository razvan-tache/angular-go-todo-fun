import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouterModule } from './modules/router/router-module/app-router.module';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
