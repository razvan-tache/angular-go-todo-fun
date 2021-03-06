import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRouterModule } from './modules/router/app-router.module';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FakeBackendService } from './modules/fake-backend/services/fakebackend/fake-backend.service';
import { CoreModule } from './modules/core/core.module';
import { FakeBackendModule } from './modules/fake-backend/fake-backend.module';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import {AppMaterialModule} from './modules/material/app-material.module';
import { GuestLayoutComponent } from './components/guest-layout/guest-layout.component';
import { LoggedInLayoutComponent } from './components/logged-in-layout/logged-in-layout.component';
import {LayoutModule} from '@angular/cdk/layout';

/**
 * If not logged in redirect to /login or /register
 * else use the current user
 *
 * if logged in
 *  can access logout
 * else
 *  cant
 *
 * 1. Implement AuthService
 * 2. Create login component
 * 3. Create register component
 * 4. Add the routes
 *
 * some line asdsa
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    LogoutComponent,
    GuestLayoutComponent,
    LoggedInLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    LayoutModule,
    CoreModule,
    FakeBackendModule,
    HttpClientModule,
    FormsModule,
    AppMaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
