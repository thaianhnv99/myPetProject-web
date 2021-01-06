import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckOutComponent } from './form-check-out.component';

describe('FormCheckOutComponent', () => {
  let component: FormCheckOutComponent;
  let fixture: ComponentFixture<FormCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCheckOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
