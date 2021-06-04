import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLeftbarComponent } from './search-leftbar.component';

describe('SearchLeftbarComponent', () => {
  let component: SearchLeftbarComponent;
  let fixture: ComponentFixture<SearchLeftbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchLeftbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
