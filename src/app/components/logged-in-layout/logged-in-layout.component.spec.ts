import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInLayoutComponent } from './logged-in-layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AppMaterialModule} from '../../modules/material/app-material.module';

describe('LoggedInLayoutComponent', () => {
  let component: LoggedInLayoutComponent;
  let fixture: ComponentFixture<LoggedInLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppMaterialModule
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
    expect(app.title).toEqual('Angular with Go: To Do Fun');
  }));
  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular with Go: To Do Fun');
  }));
});
