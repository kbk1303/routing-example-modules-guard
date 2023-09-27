import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryVisitedComponent } from './country-visited.component';

describe('CountryVisitedComponent', () => {
  let component: CountryVisitedComponent;
  let fixture: ComponentFixture<CountryVisitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryVisitedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryVisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
