import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsDialogComponent } from './synonyms-dialog.component';

describe('SynonymsDialogComponent', () => {
  let component: SynonymsDialogComponent;
  let fixture: ComponentFixture<SynonymsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
