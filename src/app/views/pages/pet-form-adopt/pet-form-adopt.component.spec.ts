import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFormAdoptComponent } from './pet-form-adopt.component';

describe('PetFormAdoptComponent', () => {
  let component: PetFormAdoptComponent;
  let fixture: ComponentFixture<PetFormAdoptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetFormAdoptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFormAdoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
