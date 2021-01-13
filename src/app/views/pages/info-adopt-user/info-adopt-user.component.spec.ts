import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdoptUserComponent } from './info-adopt-user.component';

describe('InfoAdoptUserComponent', () => {
  let component: InfoAdoptUserComponent;
  let fixture: ComponentFixture<InfoAdoptUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAdoptUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAdoptUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
