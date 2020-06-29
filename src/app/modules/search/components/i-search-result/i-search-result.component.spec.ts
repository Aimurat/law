import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ISearchResultComponent } from './i-search-result.component';

describe('ISearchResultComponent', () => {
  let component: ISearchResultComponent;
  let fixture: ComponentFixture<ISearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ISearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ISearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
