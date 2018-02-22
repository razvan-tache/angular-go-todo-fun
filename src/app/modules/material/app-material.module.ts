import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: []
})
export class AppMaterialModule {}
