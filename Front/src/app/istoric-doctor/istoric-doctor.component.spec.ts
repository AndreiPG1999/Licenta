import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstoricDoctorComponent } from './istoric-doctor.component';

describe('IstoricDoctorComponent', () => {
  let component: IstoricDoctorComponent;
  let fixture: ComponentFixture<IstoricDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstoricDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstoricDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
