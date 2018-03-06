import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInLayoutComponent } from './logged-in-layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AppMaterialModule} from '../../modules/material/app-material.module';
import {ChangeDetectorRef} from '@angular/core';
import {LayoutModule, MediaMatcher} from '@angular/cdk/layout';

describe('LoggedInLayoutComponent', () => {
  let component: LoggedInLayoutComponent;
  let fixture: ComponentFixture<LoggedInLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppMaterialModule,
        LayoutModule
      ],
      declarations: [ LoggedInLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'app'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('To Do Fun');
  }));
  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('To Do Fun');
  }));
});
