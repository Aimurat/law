import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActsDialogComponent } from './acts-dialog.component';

describe('ActsDialogComponent', () => {
  let component: ActsDialogComponent;
  let fixture: ComponentFixture<ActsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
