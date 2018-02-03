import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouterModule } from './modules/router/app-router.module';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FakeBackendService } from './modules/fake-backend/services/fakebackend/fake-backend.service';
import { CoreModule } from './modules/core/core.module';
import { FakeBackendModule } from './modules/fake-backend/fake-backend.module';
import { LoginComponent } from './components/login/login.component';

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
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    CoreModule,
    FakeBackendModule,
    HttpClientModule
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
