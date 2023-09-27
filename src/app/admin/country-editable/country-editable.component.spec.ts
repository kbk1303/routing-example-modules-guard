import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryEditableComponent } from './country-editable.component';

describe('CountryEditableComponent', () => {
  let component: CountryEditableComponent;
  let fixture: ComponentFixture<CountryEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryEditableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
