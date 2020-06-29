import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundedWordsDialogComponent } from './founded-words-dialog.component';

describe('FoundedWordsDialogComponent', () => {
  let component: FoundedWordsDialogComponent;
  let fixture: ComponentFixture<FoundedWordsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundedWordsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundedWordsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
