import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {RouterTestingModule} from '@angular/router/testing';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {LayoutModule, MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppMaterialModule,
        LayoutModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
