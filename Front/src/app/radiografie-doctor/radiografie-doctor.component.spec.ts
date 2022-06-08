import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiografieDoctorComponent } from './radiografie-doctor.component';

describe('RadiografieDoctorComponent', () => {
  let component: RadiografieDoctorComponent;
  let fixture: ComponentFixture<RadiografieDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiografieDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiografieDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
